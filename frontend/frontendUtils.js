let FrontendUtils = {
    // TODO: This should be replaced with the buildLinkHTML() function.
    generateNavigationBarLinkHTML: function(route, linkText)
    {
        return `<a href="javascript:GameUI.reportAction('${route}')">${linkText}</a>`;
    }
}