// 布局配置`/src/stores/theme.ts`
declare type ThemeConfigLayout = 'default' | 'classic' | 'transverse' | 'columns'
declare type ThemeConfigGlobalComponentSize = 'large' | 'default' | 'small'
declare interface IThemeConfigState {
    primary: string
    topBar: string
    topBarColor: string
    isTopBarColorGradual: boolean
    menuBar: string
    menuBarColor: string
    menuBarActiveColor: string
    isMenuBarColorGradual: boolean
    columnsMenuBar: string
    columnsMenuBarColor: string
    isColumnsMenuBarColorGradual: boolean
    isColumnsMenuHoverPreload: boolean
    isCollapse: boolean
    isUniqueOpened: boolean
    isFixedHeader: boolean
    isFixedHeaderChange: boolean
    isClassicSplitMenu: boolean
    isLockScreen: boolean
    lockScreenTime: number
    isShowLogo: boolean
    isShowLogoChange: boolean
    isBreadcrumb: boolean
    isBreadcrumbIcon: boolean
    isTagsView: boolean
    isTagsViewIcon: boolean
    isCacheTagsView: boolean
    isSortableTagsView: boolean
    isShareTagsView: boolean
    isFooter: boolean
    isGrayscale: boolean
    isInvert: boolean
    isIsDark: boolean
    isWatermark: boolean
    watermarkText: string
    tagsStyle: string
    animation: 'slide-right' | 'slide-left' | 'opacity'
    columnsAsideStyle: 'columns-round' | 'columns-card'
    columnsAsideLayout: 'columns-horizontal' | 'columns-vertical'
    layout: ThemeConfigLayout
    isRequestRoutes: boolean
    globalTitle: string
    globalViceTitle: string
    globalViceTitleMsg: string
    globalI18n: string
    globalComponentSize: ThemeConfigGlobalComponentSize
}

// 用户信息
declare interface IUserInfo {
    authBtnList: string[]
    photo: string
    roles: string[]
    time: number
    username: string
    // [key: string]: T
}
