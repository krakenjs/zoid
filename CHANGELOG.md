# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [10.4.0](https://github.com/krakenjs/zoid/compare/v10.3.3...v10.4.0) (2024-12-19)


### Features

* add getExtensions method to extend zoid component instance ([#468](https://github.com/krakenjs/zoid/issues/468)) ([44d2d24](https://github.com/krakenjs/zoid/commit/44d2d242dc60765a015821b7b3153fdfa18d7c00))
* support additional properties to be added to zoid component from the client ([#464](https://github.com/krakenjs/zoid/issues/464)) ([d2f3f09](https://github.com/krakenjs/zoid/commit/d2f3f0992ae9947e709d20875a666aedce645e3c))


### Bug Fixes

* commit flow-typed to fix ci ([#457](https://github.com/krakenjs/zoid/issues/457)) ([e4da223](https://github.com/krakenjs/zoid/commit/e4da22308b286fb2212af543574a1e66de7c70d1))
* resolve the promise when component is closed/destroyed ([#455](https://github.com/krakenjs/zoid/issues/455)) ([b42cc03](https://github.com/krakenjs/zoid/commit/b42cc038ec0019165848aa95ebffa652960e61d7))
* skip failing test ([#466](https://github.com/krakenjs/zoid/issues/466)) ([a70f250](https://github.com/krakenjs/zoid/commit/a70f250501cdfeba253a36afcdc8937afc2c42ee))

### [10.3.3](https://github.com/krakenjs/zoid/compare/v10.3.2...v10.3.3) (2023-11-02)


### Bug Fixes

* **initChild:** setName is applied in popup context ([#444](https://github.com/krakenjs/zoid/issues/444)) ([b26b8cb](https://github.com/krakenjs/zoid/commit/b26b8cba89324710beecbc09b99551ccf6630e32))

### [10.3.2](https://github.com/krakenjs/zoid/compare/v10.3.1...v10.3.2) (2023-10-30)


### Bug Fixes

* reduce frequency of iframe removed error ([#429](https://github.com/krakenjs/zoid/issues/429)) ([fd2ec05](https://github.com/krakenjs/zoid/commit/fd2ec05cab35143abc287649f6868ace4eb5626e))
* **venmo:** window name ([#443](https://github.com/krakenjs/zoid/issues/443)) ([02bcaab](https://github.com/krakenjs/zoid/commit/02bcaab83512d5339c921fe240f5929b4580e97d))

### [10.3.1](https://github.com/krakenjs/zoid/compare/v10.3.0...v10.3.1) (2023-06-13)


### Bug Fixes

* **prop:** trusted domain ([#440](https://github.com/krakenjs/zoid/issues/440)) ([081d0d5](https://github.com/krakenjs/zoid/commit/081d0d5a77bbd496284ef9e138f353a4386b6ee8))

## [10.3.0](https://github.com/krakenjs/zoid/compare/v10.2.4...v10.3.0) (2023-06-12)


### Features

* **venmo:** allow trusted domains ([#439](https://github.com/krakenjs/zoid/issues/439)) ([5f3bf00](https://github.com/krakenjs/zoid/commit/5f3bf00a08715154ff110023f0a1b862d560670e))


* **docs:** update npm badge ([#437](https://github.com/krakenjs/zoid/issues/437)) ([2ef6fdb](https://github.com/krakenjs/zoid/commit/2ef6fdb4efeeecdbbe446623cf45650499d598fa))

### [10.2.4](https://github.com/krakenjs/zoid/compare/v10.2.3...v10.2.4) (2023-05-22)

### [10.2.3](https://github.com/krakenjs/zoid/compare/v10.2.2...v10.2.3) (2023-05-03)

### [10.2.2](https://github.com/krakenjs/zoid/compare/v10.2.1...v10.2.2) (2023-05-01)


### Bug Fixes

* reduce frequency of "Detected iframe close" error ([#426](https://github.com/krakenjs/zoid/issues/426)) ([5343277](https://github.com/krakenjs/zoid/commit/53432775742a56aad8377c84258ec8d7a17d0450))

### [10.2.1](https://github.com/krakenjs/zoid/compare/v10.2.0...v10.2.1) (2023-04-25)


### Bug Fixes

* only throw errors for major version changes ([#425](https://github.com/krakenjs/zoid/issues/425)) ([57e8989](https://github.com/krakenjs/zoid/commit/57e8989fedf94ea1e1084827acc21fedfad6e267))

## [10.2.0](https://github.com/krakenjs/zoid/compare/v10.1.0...v10.2.0) (2023-04-24)


### Features

* upgrade to grumbler scripts 8 ([#414](https://github.com/krakenjs/zoid/issues/414)) ([b857e89](https://github.com/krakenjs/zoid/commit/b857e8930e76ebae77d755f5e9e0f5ac432a5790))


### Bug Fixes

* avoid throwing errors if container is no longer in page ([#424](https://github.com/krakenjs/zoid/issues/424)) ([e2825bb](https://github.com/krakenjs/zoid/commit/e2825bb5e08eadde14e8fc7b6b76d9069c5a3daf))


* **docs:** update github actions badge url ([#419](https://github.com/krakenjs/zoid/issues/419)) ([31d59fb](https://github.com/krakenjs/zoid/commit/31d59fbd1c89697e3773a5f043a506c95ee009a5))
* fix typos in parent-props and xprops docs ([#408](https://github.com/krakenjs/zoid/issues/408)) ([2fe2858](https://github.com/krakenjs/zoid/commit/2fe28584d75f9f740ec7a6d162b8d775c9cf39a0))
* remove token from publish action ([#422](https://github.com/krakenjs/zoid/issues/422)) ([3c6fa18](https://github.com/krakenjs/zoid/commit/3c6fa180c564b248d0e1b2ed66a2eaef8e2527e6))
* update babel config ([#418](https://github.com/krakenjs/zoid/issues/418)) ([2657252](https://github.com/krakenjs/zoid/commit/2657252085d401d64740fc3c8b372f085705bbf6))
* use prettier ([#401](https://github.com/krakenjs/zoid/issues/401)) ([3974c52](https://github.com/krakenjs/zoid/commit/3974c52a880e8b7a72201c9ad205b576611e7c65))

## [10.1.0](https://github.com/krakenjs/zoid/compare/v10.0.0...v10.1.0) (2022-05-03)


### Features

* add events on prerender start and finish ([#403](https://github.com/krakenjs/zoid/issues/403)) ([c603048](https://github.com/krakenjs/zoid/commit/c6030488dcbb4bb182b630acf722b6a8bbafc5dd))


* move devDependencies to [@krakenjs](https://github.com/krakenjs) scope ([#400](https://github.com/krakenjs/zoid/issues/400)) ([a085f40](https://github.com/krakenjs/zoid/commit/a085f408ff4f20d95f22ab5b44acb490038c33d7))

## [10.0.0](https://github.com/krakenjs/zoid/compare/v9.0.87...v10.0.0) (2022-03-01)


### ⚠ BREAKING CHANGES

* move to krakenjs scope (#395)

* fix build badge ([eb8677a](https://github.com/krakenjs/zoid/commit/eb8677a3c41f8ad52158ad946573d0df9a47538d))
* move to krakenjs scope ([#395](https://github.com/krakenjs/zoid/issues/395)) ([c10ac41](https://github.com/krakenjs/zoid/commit/c10ac415ce6a2174c7ef08f2451da95bb9795888))
* standardize configs ([7504244](https://github.com/krakenjs/zoid/commit/7504244fe9c856a74e210008ed5fac00d2bf114d))
