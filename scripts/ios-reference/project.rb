# CocoaPods' xcodeproj gem is required; do not silently install dependencies.
require 'xcodeproj'
require 'fileutils'
out = ARGV.fetch(0)
source = File.expand_path(__dir__)
project = Xcodeproj::Project.new(File.join(out, 'Reference.xcodeproj'))
host = project.new_target(:application, 'ReferenceHost', :ios, '18.0')
tests = project.new_target(:ui_test_bundle, 'ReferenceUITests', :ios, '18.0')
[[host, 'Host.swift'], [tests, 'SettingsReference.swift']].each do |target, filename|
  ref = project.main_group.new_file(File.join(source, filename))
  target.source_build_phase.add_file_reference(ref)
  target.build_configurations.each do |config|
    config.build_settings.merge!({
      'SWIFT_VERSION' => '5.0', 'GENERATE_INFOPLIST_FILE' => 'YES',
      'PRODUCT_BUNDLE_IDENTIFIER' => "local.reference.#{target.name}",
      'CODE_SIGNING_ALLOWED' => 'NO', 'TARGETED_DEVICE_FAMILY' => '1',
      'ASSETCATALOG_COMPILER_APPICON_NAME' => ''
    })
  end
end
tests.add_dependency(host)
tests.build_configurations.each { |c| c.build_settings['TEST_TARGET_NAME'] = host.name }
project.root_object.attributes['TargetAttributes'] = { tests.uuid => { 'TestTargetID' => host.uuid } }
project.save
scheme = Xcodeproj::XCScheme.new
scheme.add_build_target(host)
scheme.add_build_target(tests)
scheme.add_test_target(tests)
scheme.save_as(project.path, 'Reference', true)
