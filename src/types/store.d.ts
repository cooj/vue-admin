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

// mitt 类型   ////////////////////////////////////////////

/**
 * mitt 事件类型定义
 *
 * @method restoreDefault 分栏布局，鼠标移入、移出数据显示
 * @method setSendColumnsChildren 分栏布局，鼠标移入、移出菜单数据传入到 navMenu 下的菜单中
 * @method setSendClassicChildren 经典布局，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
 * @method getBreadcrumbIndexSetFilterRoutes 布局设置弹窗，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
 * @method layoutMobileResize 浏览器窗口改变时，用于适配移动端界面显示
 * @method openOrCloseSortable 布局设置弹窗，开启 TagsView 拖拽
 * @method openShareTagsView 布局设置弹窗，开启 TagsView 共用
 * @method onTagsViewRefreshRouterView tagsview 刷新界面
 * @method onCurrentContextmenuClick tagsview 右键菜单每项点击时
 */
declare interface MittType<T = any> {
    restoreDefault?: string
    setSendColumnsChildren: T
    setSendClassicChildren: T
    getBreadcrumbIndexSetFilterRoutes?: string
    layoutMobileResize: T
    openOrCloseSortable?: string
    openShareTagsView?: string
    onTagsViewRefreshRouterView?: T
    onCurrentContextmenuClick?: T
}

// mitt 参数类型定义
declare interface LayoutMobileResize {
    layout: ThemeConfigState['themeConfig']['layout']
    clientWidth: number
}

// mitt 参数菜单类型
declare interface MittMenu {
    children: RouteRecordRaw[]
    item?: RouteItem
}
