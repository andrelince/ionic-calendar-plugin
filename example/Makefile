build-ios-prod:
	@yarn build
	@npx cap sync ios
run-ios: build-ios-prod
	@npx cap open ios