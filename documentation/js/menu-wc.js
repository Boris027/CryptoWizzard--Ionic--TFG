'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">CryptoWizzard-Ionic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutPageModule.html" data-type="entity-link" >AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AboutPageModule-5f035652b79be0445e83853940e86aed741f165a8d1f7ef86d69290b2e4b18a902ad7fe2629a6013d18572101eb6037fc6fffa1f26d253efe53f3f84bc2e0f78"' : 'data-bs-target="#xs-components-links-module-AboutPageModule-5f035652b79be0445e83853940e86aed741f165a8d1f7ef86d69290b2e4b18a902ad7fe2629a6013d18572101eb6037fc6fffa1f26d253efe53f3f84bc2e0f78"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-5f035652b79be0445e83853940e86aed741f165a8d1f7ef86d69290b2e4b18a902ad7fe2629a6013d18572101eb6037fc6fffa1f26d253efe53f3f84bc2e0f78"' :
                                            'id="xs-components-links-module-AboutPageModule-5f035652b79be0445e83853940e86aed741f165a8d1f7ef86d69290b2e4b18a902ad7fe2629a6013d18572101eb6037fc6fffa1f26d253efe53f3f84bc2e0f78"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link" >AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPanelPageModule.html" data-type="entity-link" >AdminPanelPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminPanelPageModule-85a3127c0285210bc94df13e633904512c4b471e70a5c46884444a1c479ab1208b1fefb79a3ac9ebae95b2487ad7565cb306eabffa7f9918dcfcedc8c13dc440"' : 'data-bs-target="#xs-components-links-module-AdminPanelPageModule-85a3127c0285210bc94df13e633904512c4b471e70a5c46884444a1c479ab1208b1fefb79a3ac9ebae95b2487ad7565cb306eabffa7f9918dcfcedc8c13dc440"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPanelPageModule-85a3127c0285210bc94df13e633904512c4b471e70a5c46884444a1c479ab1208b1fefb79a3ac9ebae95b2487ad7565cb306eabffa7f9918dcfcedc8c13dc440"' :
                                            'id="xs-components-links-module-AdminPanelPageModule-85a3127c0285210bc94df13e633904512c4b471e70a5c46884444a1c479ab1208b1fefb79a3ac9ebae95b2487ad7565cb306eabffa7f9918dcfcedc8c13dc440"' }>
                                            <li class="link">
                                                <a href="components/AdminPanelPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPanelPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPanelPageRoutingModule.html" data-type="entity-link" >AdminPanelPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-02203e28add657a396a7a644434aec8ba57dc40bd6be8ac9adab69d939691d969522d4aa303bb16873b812b25045afb0424c690d4cf3d5f966690c67c11ea971"' : 'data-bs-target="#xs-components-links-module-AppModule-02203e28add657a396a7a644434aec8ba57dc40bd6be8ac9adab69d939691d969522d4aa303bb16873b812b25045afb0424c690d4cf3d5f966690c67c11ea971"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-02203e28add657a396a7a644434aec8ba57dc40bd6be8ac9adab69d939691d969522d4aa303bb16873b812b25045afb0424c690d4cf3d5f966690c67c11ea971"' :
                                            'id="xs-components-links-module-AppModule-02203e28add657a396a7a644434aec8ba57dc40bd6be8ac9adab69d939691d969522d4aa303bb16873b812b25045afb0424c690d4cf3d5f966690c67c11ea971"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CryptoviewPageModule.html" data-type="entity-link" >CryptoviewPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' : 'data-bs-target="#xs-components-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' :
                                            'id="xs-components-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' }>
                                            <li class="link">
                                                <a href="components/CryptoviewPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CryptoviewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' : 'data-bs-target="#xs-directives-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' :
                                        'id="xs-directives-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' }>
                                        <li class="link">
                                            <a href="directives/BackgraphbuttonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BackgraphbuttonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ColorpercentDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorpercentDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' : 'data-bs-target="#xs-pipes-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' :
                                            'id="xs-pipes-links-module-CryptoviewPageModule-f3d226fa8121a44c5173d7f90f5b830bf7933c5682e1ef12497f7da12f22f7fb2adffbd44a5f088679772783f3d9309e716ee658d17297cefd511c91327c892a"' }>
                                            <li class="link">
                                                <a href="pipes/CurrencyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PercentformaterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PercentformaterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CryptoviewPageRoutingModule.html" data-type="entity-link" >CryptoviewPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' : 'data-bs-target="#xs-components-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' :
                                            'id="xs-components-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' : 'data-bs-target="#xs-pipes-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' :
                                            'id="xs-pipes-links-module-HomePageModule-0924cd669956b8739d12370987aa831b77d6eb11e80255447e2d17ea0d52d23d3147469a4b41f08b036e5d9a0c858f6ab5bf9a53f6a943c41b359957fa61de5f"' }>
                                            <li class="link">
                                                <a href="pipes/CurrencyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ListcontentPageModule.html" data-type="entity-link" >ListcontentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ListcontentPageModule-f0ba33da60b49980a8d3d0e5f731284894883e60919ea78d714ef048964ad4377c943ba8a5200d8c2bdf19521992a69fa45e0d367481bcc0ed012bbef48243e6"' : 'data-bs-target="#xs-components-links-module-ListcontentPageModule-f0ba33da60b49980a8d3d0e5f731284894883e60919ea78d714ef048964ad4377c943ba8a5200d8c2bdf19521992a69fa45e0d367481bcc0ed012bbef48243e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ListcontentPageModule-f0ba33da60b49980a8d3d0e5f731284894883e60919ea78d714ef048964ad4377c943ba8a5200d8c2bdf19521992a69fa45e0d367481bcc0ed012bbef48243e6"' :
                                            'id="xs-components-links-module-ListcontentPageModule-f0ba33da60b49980a8d3d0e5f731284894883e60919ea78d714ef048964ad4377c943ba8a5200d8c2bdf19521992a69fa45e0d367481bcc0ed012bbef48243e6"' }>
                                            <li class="link">
                                                <a href="components/ListcontentPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListcontentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListcontentPageRoutingModule.html" data-type="entity-link" >ListcontentPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ListPageModule.html" data-type="entity-link" >ListPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ListPageModule-e6252563e5f2de293c2b2a3868e7aa95d1371924550b15821c7348b386ca998cdcdc682f594eb54b3d7fc2784c9b837edbd016acab1926c247e34bc76f2c7376"' : 'data-bs-target="#xs-components-links-module-ListPageModule-e6252563e5f2de293c2b2a3868e7aa95d1371924550b15821c7348b386ca998cdcdc682f594eb54b3d7fc2784c9b837edbd016acab1926c247e34bc76f2c7376"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ListPageModule-e6252563e5f2de293c2b2a3868e7aa95d1371924550b15821c7348b386ca998cdcdc682f594eb54b3d7fc2784c9b837edbd016acab1926c247e34bc76f2c7376"' :
                                            'id="xs-components-links-module-ListPageModule-e6252563e5f2de293c2b2a3868e7aa95d1371924550b15821c7348b386ca998cdcdc682f594eb54b3d7fc2784c9b837edbd016acab1926c247e34bc76f2c7376"' }>
                                            <li class="link">
                                                <a href="components/ListPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListPageRoutingModule.html" data-type="entity-link" >ListPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-c320e40ff47af105efe5c90e13e149193b1c7380498cc58a0dcec163f6b0e6f287b9a4206a04afbb3a5768a16b4f1397048884c7a74afe221c7ba437663be469"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-c320e40ff47af105efe5c90e13e149193b1c7380498cc58a0dcec163f6b0e6f287b9a4206a04afbb3a5768a16b4f1397048884c7a74afe221c7ba437663be469"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-c320e40ff47af105efe5c90e13e149193b1c7380498cc58a0dcec163f6b0e6f287b9a4206a04afbb3a5768a16b4f1397048884c7a74afe221c7ba437663be469"' :
                                            'id="xs-components-links-module-LoginPageModule-c320e40ff47af105efe5c90e13e149193b1c7380498cc58a0dcec163f6b0e6f287b9a4206a04afbb3a5768a16b4f1397048884c7a74afe221c7ba437663be469"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfilePageModule-3237b796984dee2a7161e6db34127f09f8902dba07e2f773e22bf22640d59c5b18eb9c0d9098f9f47e95d0eb606bcd5e78eafece81467835b1142a9590797004"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-3237b796984dee2a7161e6db34127f09f8902dba07e2f773e22bf22640d59c5b18eb9c0d9098f9f47e95d0eb606bcd5e78eafece81467835b1142a9590797004"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-3237b796984dee2a7161e6db34127f09f8902dba07e2f773e22bf22640d59c5b18eb9c0d9098f9f47e95d0eb606bcd5e78eafece81467835b1142a9590797004"' :
                                            'id="xs-components-links-module-ProfilePageModule-3237b796984dee2a7161e6db34127f09f8902dba07e2f773e22bf22640d59c5b18eb9c0d9098f9f47e95d0eb606bcd5e78eafece81467835b1142a9590797004"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link" >RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPageModule-95f94689cc5d8ea593166e548ce969cc515a8100fe6a5dbe3148e0e5bf3501d52d3f4ee42ffc20009e5430c10dc5173ef0b1777b0ecd6104ca5ac09215a1e9fa"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-95f94689cc5d8ea593166e548ce969cc515a8100fe6a5dbe3148e0e5bf3501d52d3f4ee42ffc20009e5430c10dc5173ef0b1777b0ecd6104ca5ac09215a1e9fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-95f94689cc5d8ea593166e548ce969cc515a8100fe6a5dbe3148e0e5bf3501d52d3f4ee42ffc20009e5430c10dc5173ef0b1777b0ecd6104ca5ac09215a1e9fa"' :
                                            'id="xs-components-links-module-RegisterPageModule-95f94689cc5d8ea593166e548ce969cc515a8100fe6a5dbe3148e0e5bf3501d52d3f4ee42ffc20009e5430c10dc5173ef0b1777b0ecd6104ca5ac09215a1e9fa"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageRoutingModule.html" data-type="entity-link" >RegisterPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SearchPageModule.html" data-type="entity-link" >SearchPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchPageModule-46a3bb2db55bdca4cc740262ce83571f298b7e68d6717228c10bb930f9a34a7d444dbd621575c35ce8292a6d4c8d0f93831d41478598fb43bba4de47e780bcdd"' : 'data-bs-target="#xs-components-links-module-SearchPageModule-46a3bb2db55bdca4cc740262ce83571f298b7e68d6717228c10bb930f9a34a7d444dbd621575c35ce8292a6d4c8d0f93831d41478598fb43bba4de47e780bcdd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchPageModule-46a3bb2db55bdca4cc740262ce83571f298b7e68d6717228c10bb930f9a34a7d444dbd621575c35ce8292a6d4c8d0f93831d41478598fb43bba4de47e780bcdd"' :
                                            'id="xs-components-links-module-SearchPageModule-46a3bb2db55bdca4cc740262ce83571f298b7e68d6717228c10bb930f9a34a7d444dbd621575c35ce8292a6d4c8d0f93831d41478598fb43bba4de47e780bcdd"' }>
                                            <li class="link">
                                                <a href="components/SearchPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchPageRoutingModule.html" data-type="entity-link" >SearchPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' : 'data-bs-target="#xs-components-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' :
                                            'id="xs-components-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' }>
                                            <li class="link">
                                                <a href="components/AdminFormularyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminFormularyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CryptocardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CryptocardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CryptosimplecardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CryptosimplecardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomGenderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomGenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListcryptoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListcryptoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListformularyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListformularyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' : 'data-bs-target="#xs-directives-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' :
                                        'id="xs-directives-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' }>
                                        <li class="link">
                                            <a href="directives/ColorpercentDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorpercentDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' :
                                            'id="xs-pipes-links-module-SharedModule-dd5a28d853906b0d24a445c03bb2b3b2d45ca4b549d0dd02e09d832c01ba7b4c81dee993a592b61afa34891b211b2a2775c72b396b4804a4e0125e1bcb521bc8"' }>
                                            <li class="link">
                                                <a href="pipes/CurrencyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PercentformaterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PercentformaterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SplashPageRoutingModule.html" data-type="entity-link" >SplashPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/SplashPage.html" data-type="entity-link" >SplashPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/BackgraphbuttonDirective.html" data-type="entity-link" >BackgraphbuttonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ColorpercentDirective.html" data-type="entity-link" >ColorpercentDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FirebaseAuthMappingService.html" data-type="entity-link" >FirebaseAuthMappingService</a>
                            </li>
                            <li class="link">
                                <a href="classes/StrapiMediaService.html" data-type="entity-link" >StrapiMediaService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseAutenticationService.html" data-type="entity-link" >BaseAutenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseMediaService.html" data-type="entity-link" >BaseMediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoinGekoMapping.html" data-type="entity-link" >CoinGekoMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoinGekoRepository.html" data-type="entity-link" >CoinGekoRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptoBaseRepository.html" data-type="entity-link" >CryptoBaseRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptoBaseService.html" data-type="entity-link" >CryptoBaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptoGeko.html" data-type="entity-link" >CryptoGeko</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseAuthenticationService.html" data-type="entity-link" >FirebaseAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseMainService.html" data-type="entity-link" >FirebaseMainService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseMediaService.html" data-type="entity-link" >FirebaseMediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseUserMapping.html" data-type="entity-link" >FirebaseUserMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseUserRepository.html" data-type="entity-link" >FirebaseUserRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiAutenticationService.html" data-type="entity-link" >StrapiAutenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiAuthMappingService.html" data-type="entity-link" >StrapiAuthMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiUserMapping.html" data-type="entity-link" >StrapiUserMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiUserRepository.html" data-type="entity-link" >StrapiUserRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationService.html" data-type="entity-link" >TranslationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserBaseRepository.html" data-type="entity-link" >UserBaseRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserBaseService.html" data-type="entity-link" >UserBaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserFirebaseService.html" data-type="entity-link" >UserFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserStrapiService.html" data-type="entity-link" >UserStrapiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard2.html" data-type="entity-link" >AuthGuard2</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardAdmin.html" data-type="entity-link" >AuthGuardAdmin</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/addcrypto.html" data-type="entity-link" >addcrypto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addlistresponse.html" data-type="entity-link" >addlistresponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdvancedCrypto.html" data-type="entity-link" >AdvancedCrypto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Attributes.html" data-type="entity-link" >Attributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Attributes2.html" data-type="entity-link" >Attributes2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicCrypto.html" data-type="entity-link" >BasicCrypto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicList.html" data-type="entity-link" >BasicList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasiCryptoFromApi.html" data-type="entity-link" >BasiCryptoFromApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicUser.html" data-type="entity-link" >BasicUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/basicuseresponse.html" data-type="entity-link" >basicuseresponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BodyCreateList.html" data-type="entity-link" >BodyCreateList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/bodyupdate.html" data-type="entity-link" >bodyupdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/createListRemote.html" data-type="entity-link" >createListRemote</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateListUpdate.html" data-type="entity-link" >CreateListUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Crypto.html" data-type="entity-link" >Crypto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CryptoCoinGeko.html" data-type="entity-link" >CryptoCoinGeko</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CryptoFromApi.html" data-type="entity-link" >CryptoFromApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CryptoGraphPrice.html" data-type="entity-link" >CryptoGraphPrice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cryptoid.html" data-type="entity-link" >cryptoid</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CryptoList.html" data-type="entity-link" >CryptoList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cryptos.html" data-type="entity-link" >cryptos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cryptosxd.html" data-type="entity-link" >cryptosxd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cryptoxd.html" data-type="entity-link" >cryptoxd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data2.html" data-type="entity-link" >Data2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/datadelete.html" data-type="entity-link" >datadelete</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/deletecryptofromfavoritelist.html" data-type="entity-link" >deletecryptofromfavoritelist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Favoritelist.html" data-type="entity-link" >Favoritelist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Formats.html" data-type="entity-link" >Formats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAllList.html" data-type="entity-link" >GetAllList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getallresponse.html" data-type="entity-link" >getallresponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthenticationMapping.html" data-type="entity-link" >IAuthenticationMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthenticationService.html" data-type="entity-link" >IAuthenticationService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICoinGeko.html" data-type="entity-link" >ICoinGeko</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICryptoBase.html" data-type="entity-link" >ICryptoBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICryptoBaseMapping.html" data-type="entity-link" >ICryptoBaseMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICryptobaseService.html" data-type="entity-link" >ICryptobaseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFirebaseAuthentication.html" data-type="entity-link" >IFirebaseAuthentication</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFirebaseMainService.html" data-type="entity-link" >IFirebaseMainService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFirebaseService.html" data-type="entity-link" >IFirebaseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStrapiAuthentication.html" data-type="entity-link" >IStrapiAuthentication</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStrapiService.html" data-type="entity-link" >IStrapiService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserBaseMapping.html" data-type="entity-link" >IUserBaseMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserbaseRepositoy.html" data-type="entity-link" >IUserbaseRepositoy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserbaseService.html" data-type="entity-link" >IUserbaseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserFirebaseRepository.html" data-type="entity-link" >IUserFirebaseRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserStrapiRepositoy.html" data-type="entity-link" >IUserStrapiRepositoy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginPayLoad.html" data-type="entity-link" >LoginPayLoad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PricesCryptoFromApi.html" data-type="entity-link" >PricesCryptoFromApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/providedata.html" data-type="entity-link" >providedata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/rawbasiclist.html" data-type="entity-link" >rawbasiclist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterPayLoad.html" data-type="entity-link" >RegisterPayLoad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Small.html" data-type="entity-link" >Small</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiLoginResponse.html" data-type="entity-link" >StrapiLoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiRegister.html" data-type="entity-link" >StrapiRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiRegisterResponse.html" data-type="entity-link" >StrapiRegisterResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignIn.html" data-type="entity-link" >StrapiSignIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiUser.html" data-type="entity-link" >StrapiUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StsTokenManager.html" data-type="entity-link" >StsTokenManager</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thumbnail.html" data-type="entity-link" >Thumbnail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updateCryptoData.html" data-type="entity-link" >updateCryptoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updatecryptofromfavoritelist.html" data-type="entity-link" >updatecryptofromfavoritelist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updateCryptoId.html" data-type="entity-link" >updateCryptoId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updateCryptos.html" data-type="entity-link" >updateCryptos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updateuser.html" data-type="entity-link" >updateuser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/CurrencyPipe.html" data-type="entity-link" >CurrencyPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/PercentformaterPipe.html" data-type="entity-link" >PercentformaterPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});