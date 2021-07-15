const ProxyDelegate = artifacts.require('ProxyDelegate');
const ProxyDelegateAlternative = artifacts.require('ProxyDelegateAlternative');
const SomeLibrary = artifacts.require('SomeLibrary');

module.exports = function (deployer) {
    deployer.deploy(SomeLibrary)
        .then(() => deployer.deploy(ProxyDelegate, SomeLibrary.address)
            .then(() => deployer.deploy(ProxyDelegateAlternative, SomeLibrary.address))
        );
}