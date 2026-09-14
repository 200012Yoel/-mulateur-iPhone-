package com.sarahos.actions

/**
 * Contrat stable entre SarahAssistant et le futur service système SarahActions.
 *
 * Ce module n'accorde aucun privilège : le service AIDL final devra vérifier
 * l'identité de l'appelant, la permission, le consentement et les contraintes
 * propres à chaque action avant de l'exécuter.
 */
object SarahActionContract {
    const val API_VERSION = 1

    enum class ActionId(
        val requiresUserConfirmation: Boolean,
        val risk: Risk,
    ) {
        LAUNCH_APPLICATION(false, Risk.LOW),
        OPEN_SETTINGS_PAGE(false, Risk.LOW),
        START_TIMER(false, Risk.LOW),
        OPEN_DOCUMENT_PICKER(false, Risk.LOW),
        CAPTURE_PHOTO(true, Risk.HIGH),
        PLACE_CALL(true, Risk.HIGH),
        SEND_MESSAGE(true, Risk.HIGH),
        DELETE_USER_FILE(true, Risk.HIGH),
    }

    enum class Risk { LOW, HIGH }

    /**
     * Les clés sont contrôlées par action. Aucun chemin arbitraire, commande
     * shell, nom de service Binder ou URI non validée ne fait partie du contrat.
     */
    val allowedArgumentKeys: Map<ActionId, Set<String>> = mapOf(
        ActionId.LAUNCH_APPLICATION to setOf("packageName"),
        ActionId.OPEN_SETTINGS_PAGE to setOf("pageId"),
        ActionId.START_TIMER to setOf("durationSeconds", "label"),
        ActionId.OPEN_DOCUMENT_PICKER to setOf("mimeTypes", "allowMultiple"),
        ActionId.CAPTURE_PHOTO to setOf("camera", "timerSeconds"),
        ActionId.PLACE_CALL to setOf("phoneNumber"),
        ActionId.SEND_MESSAGE to setOf("recipient", "body"),
        ActionId.DELETE_USER_FILE to setOf("documentUri"),
    )

    data class Request(
        val apiVersion: Int = API_VERSION,
        val action: ActionId,
        val arguments: Map<String, String> = emptyMap(),
        val userConfirmed: Boolean = false,
    )

    sealed interface Validation {
        data object Accepted : Validation
        data class Rejected(val reason: String) : Validation
    }

    fun validate(request: Request): Validation {
        if (request.apiVersion != API_VERSION) {
            return Validation.Rejected("Unsupported API version")
        }
        if (request.action.requiresUserConfirmation && !request.userConfirmed) {
            return Validation.Rejected("User confirmation is required")
        }
        val allowedKeys = allowedArgumentKeys.getValue(request.action)
        val unknownKeys = request.arguments.keys - allowedKeys
        if (unknownKeys.isNotEmpty()) {
            return Validation.Rejected("Unknown argument keys: ${unknownKeys.sorted().joinToString()}")
        }
        return validateArguments(request)
    }

    private fun validateArguments(request: Request): Validation = when (request.action) {
        ActionId.LAUNCH_APPLICATION -> nonBlank(request.arguments["packageName"], "packageName")
        ActionId.OPEN_SETTINGS_PAGE -> nonBlank(request.arguments["pageId"], "pageId")
        ActionId.START_TIMER -> boundedInt(request.arguments["durationSeconds"], "durationSeconds", 1, 86_400)
        ActionId.OPEN_DOCUMENT_PICKER -> Validation.Accepted
        ActionId.CAPTURE_PHOTO -> boundedInt(request.arguments["timerSeconds"] ?: "0", "timerSeconds", 0, 10)
        ActionId.PLACE_CALL -> nonBlank(request.arguments["phoneNumber"], "phoneNumber")
        ActionId.SEND_MESSAGE -> nonBlank(request.arguments["recipient"], "recipient")
        ActionId.DELETE_USER_FILE -> nonBlank(request.arguments["documentUri"], "documentUri")
    }

    private fun nonBlank(value: String?, name: String): Validation =
        if (value.isNullOrBlank()) Validation.Rejected("Missing $name") else Validation.Accepted

    private fun boundedInt(value: String?, name: String, min: Int, max: Int): Validation {
        val parsed = value?.toIntOrNull()
        return if (parsed == null || parsed !in min..max) {
            Validation.Rejected("$name must be between $min and $max")
        } else {
            Validation.Accepted
        }
    }
}
