import HighLightSpacesEdit from './components/HighlightSpacesEdit.vue'
 
Vue.config.productionTip = false

const lang = eXo.env.portal.language;
const url = `/functional-configuration-portlets/vuesLocales/locale_${lang}.json`;

const fallbackLang = 'en';
const fallbAckLangUrl = `/functional-configuration-portlets/vuesLocales/locale_${fallbackLang}.json`;

function fetchLangFileExist(langUrl) {
	return new Promise((success, error) => {
		fetch(langUrl)
			.then(() => success())
			.catch(() => error());
	});
	
}

export function init(preferences) {

	fetchLangFileExist(url)
		.then(() => loadVueWithPreferedLand())
		.catch(() => loadVueWithFallbackLand());

	function loadVueWithPreferedLand() {
		renderVueAppWithI18n(lang, url);
	}
		
	function loadVueWithFallbackLand() {
		renderVueAppWithI18n(fallbackLang, fallbAckLangUrl);
	}

	function renderVueAppWithI18n(lang, url) {
		exoi18n.loadLanguageAsync(lang, url).then(i18n => {

            Vue.prototype.$preferences = preferences
			new Vue({
				render: h => h(HighLightSpacesEdit),
				i18n
			}).$mount('#highlightSpacesEdit');
		});
	}
}
