
/* SiteCatalyst code version: AppMeasurement 2.4
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

if (window.Site && window.Site.Plugins && window.Site.Plugins.sc && window.Site.Plugins.sc.getAccount ){
    var s_account = window.Site.Plugins.sc.getAccount();
}
else {
	var s_account="locgovprod";
    var cur_url=''+window.location.href;

    if( cur_url.indexOf('localhost')>-1 ||
		cur_url.indexOf('.local')>-1 ||
		cur_url.indexOf('.loctest.gov')>-1||
		cur_url.indexOf('dev.loc.gov')>-1 ||
		cur_url.indexOf('test.loc.gov')>-1||
		cur_url.indexOf('loc.gov:8081')>-1||
		cur_url.indexOf('test-staff.loc.gov')>-1)
	{
        s_account="locgovdev";
    }
	else if(cur_url.indexOf('loc.gov/staff')>-1 ||
			cur_url.indexOf('loc.gov/extranet')>-1 ||
			cur_url.indexOf('col=staff')>-1 ||
			cur_url.indexOf('staff.loc.gov')>-1)
	{
        s_account="locintranetprod";
    }
}

var s=s_gi(s_account);
s.debugTracking =false;

/*** SITE CONFIG SECTION ***/
/* WARNING: Changing the site configuration variables can drastically alter
 the way your site collects data, do not alter them..*/
s.visitorNamespace="thelibraryofcongress";
s.dc="122";
if ("https:" == window.location.protocol) {
  s.trackingServerSecure="https://smon.loc.gov";
} else {
    s.trackingServer="cmon.loc.gov";
}
s.charSet="UTF-8";

/*** LINK TRACKING CONFIG SECTION ***/
s.trackDownloadLinks=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,docx,pdf,xls,xlsx,xml,sgm,sgml,brf,txt,jpg,jpeg,jp2,gif,tif,tiff,pcx,sid,ram,ra,mpeg,ppt,pptx,json,nt,rdf,mp4,m4v,kmz,ppx,ppsx,bz2,gz,epub";
s.trackExternalLinks=true;

s.linkInternalFilters="javascript:,loc.gov,africanamericanhistorymonth.gov,americaslibrary.gov,americasstory.gov,asianpacificheritage.gov,classificationweb.net,congress.gov,copyright.gov,crs.gov,digitalpreservation.gov,digitizationguidelines.gov,glin.gov,hispanicheritagemonth.gov,jewishheritage.gov,jewishheritagemonth.gov,lis.gov,libraryofcongress.gov,medicare.commission.gov,myloc.gov,nativeamericanheritagemonth.gov,netpreserve.org,nlstalkingbooks.org,openworld.gov,read.gov,section108.gov,thomas.gov,wdl.org,womenshistorymonth.gov,worlddigitallibrary.org";

s.trackInlineStats=true;
s.linkLeaveQueryString=true;
s.linkTrackVars="eVar15";
s.linkTrackEvents="None";

//UX Tracking - start
var loc_ux_tracking = (function() {
    return {
        trackUserInterfaceAction : function($, control_name, interaction){
            control_name = encodeURI(control_name);
            interaction = encodeURI(interaction);
            $("<img width='1' height='1' border='0' alt=''/>").attr('src', '//'+s.trackingServer+'/b/ss/locmainprod/1/H.25.2--NS/0&amp;c7='+control_name+'&amp;c8='+interaction);
        },

        trackUserInteractionEvent : function(href_attr, category, action, label){
        	s.linkTrackVars = s.linkTrackVars + ",prop75,prop1";
        
        	var eventString = category + '::' + action + '::' + label;
        	s.prop75 = eventString
        	s.tl(href_attr,'o',eventString);
        },

        trackFileDownloadEvent : function(href_attr, file_info){
            s.linkTrackVars = s.linkTrackVars + ",eVar25,eVar26,eVar27,eVar28,eVar29";

            // URL
            if (typeof file_info[0] != 'undefined') {
            	s.eVar29 = file_info[0];
            }
            // MIME Type
            if (typeof file_info[1] != 'undefined') {
            	s.eVar25 = file_info[1];
            }
            // Division
            if (typeof file_info[2] != 'undefined') {
            	s.eVar26 = file_info[2];
            }
            // Collection
            if (typeof file_info[3] != 'undefined') {
            	s.eVar27 = file_info[3];
            }
            // Item Name
            if (typeof file_info[4] != 'undefined') {
            	s.eVar28 = file_info[4];
            }

            s.tl(href_attr,'o',file_info.toString());
        }
	};
})();
//UX Tracking - end

//Performance Timing
s.ptf=true;

s.usePlugins=true;
function s_doPlugins(s) {
	/** SET GLOBAL VARIABLES **/
	s.events=s.apl(s.events,'event40',',',2);
	s.server=document.domain;
	s.prop1=document.title;

	s.campaign=s.getQueryParam('loclr');
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
	//s.performanceTiming();
	//Performance Timing
    if(s.ptf === true)s.performanceTiming();
    s.ptf = false;
  
  s.prop68=s_getLoadTime();

	s.currentURL=s.wd.location.href;

	s.eVar15="D=g";

	/** JS FILE VERSION **/
	
	s.prop9=s.eVar19="PRODDEC2012-1";
	
  // Following line for testing purposes
  s.prop2=s.Util.getQueryParam('q');
  
	//Track Search v2

  
	//s.prop2=s.Util.getQueryParam('q,cclquery,qt,_q,k,ortext,andtext,phrasetext,proxtext,searcharg,search_arg,sa,s,querytext,query,term');
	//s.prop2=s.getValOnce(s.prop2,'s_prop2',0);
	if(s.prop2) {
		s.tempProp2=s.escp(s.prop2);
		if(s.tempProp2==s.prop2) s.eVar2=s.prop2=s.prop2.toLowerCase();
		else s.eVar2=s.prop2;
  	s.events=s.apl(s.events,'event3',',',2);

		/** Use this function to capture specific URLs or domains and push out specific sprop values to those Webs **/
		/** Search domain tracking first. Each known LOC search engine is served prop3 with a specific value **/
 
		if(s.currentURL) {
			if(s.currentURL.indexOf('fedsearch/metasearch')>-1) s.prop3="fedsearch";
			else if(s.currentURL.indexOf('search.loc.gov:8765/query.html')>-1) s.prop3="ultraseek";
			else if(s.currentURL.indexOf('chroniclingamerica.loc.gov/search')>-1) s.prop3="ndnp";
			else if(s.currentURL.indexOf('catalog.loc.gov')>-1) s.prop3="catalog";
			else if(s.currentURL.indexOf('wdl.org')>-1) s.prop3="wdl";
			else if(s.currentURL.indexOf('loc.gov/pictures')>-1) s.prop3="ppoc";
			else if(s.currentURL.indexOf('eresources.loc.gov')>-1) s.prop3="eresources";
			else if(s.currentURL.indexOf('findingaids.loc.gov')>-1) s.prop3="faid";
			else if(s.currentURL.indexOf('loc.gov/findingaids')>-1) s.prop3="faid";
			else if(s.currentURL.indexOf('lcweb2.loc.gov/diglib/lcwa')>-1) s.prop3="webarch";
			else if(s.currentURL.indexOf('sun3.loc.gov:8765/fadgi/query.html')>-1) s.prop3="digguide";
			else if(s.currentURL.indexOf('digitizationguidelines.gov/term')>-1) s.prop3="diggterm";
			else if(s.currentURL.indexOf('search.loc.gov:8765/digitalpreservation')>-1) s.prop3="digpres";
			else if(s.currentURL.indexOf('id.loc.gov')>-1) s.prop3="lcsh";
			else if(s.currentURL.indexOf('loc.gov/jukebox')>-1) s.prop3="jukebox";
			else s.prop3="misc";
		} else {
			s.prop3="unknown";
		}
		s.eVar3=s.prop3;
	}

	var exitURL=s.exitLinkHandler();
	if(exitURL) {
		s.linkTrackVars=s.linkTrackVars+",prop42";
		s.prop42=exitURL;
	}

	s.eVar8=s.getClientTime("t","15");
	s.eVar9=s.getClientTime("d");

	s.getGoogleRank('event42','event43','eVar22','eVar23');

	/***  REPORT SUITE SPECIFIC VARIABLES ***/

	/** WDL **/
	if (s.currentURL.indexOf('wdl.org')>-1){
		if(!s.prop31) s.prop31=s.getQueryParam('co');
		if(!s.prop24) s.prop24=s.getQueryParam('c');
		if(!s.prop47) s.prop47=s.getQueryParam('page');
		if(!s.prop41) s.prop41=s.getQueryParam('sort');

		if(!s.prop21) s.prop21=s.getQueryParam('n');
		if(!s.prop22) s.prop22=s.getQueryParam('l');
		if(!s.prop23) s.prop23=s.getQueryParam('r');
		if(!s.prop25) s.prop25=s.getQueryParam('p');
		if(!s.prop26) s.prop26=s.getQueryParam('ct');
		if(!s.prop27) s.prop27=s.getQueryParam('t');
		if(!s.prop28) s.prop28=s.getQueryParam('tc');
		if(!s.prop29) s.prop29=s.getQueryParam('as');
		if(!s.prop30) s.prop30=s.getQueryParam('ty');
		if(!s.prop32) s.prop32=s.getQueryParam('i');
		if(!s.prop33) s.prop33=s.getQueryParam('a');
		if(!s.prop34) s.prop34=s.getQueryParam('b');
		if(!s.prop35) s.prop35=s.getQueryParam('ql');
		if(!s.prop36) s.prop36=s.getQueryParam('view_type');
	}

	if (s.currentURL.indexOf('catalog.loc.gov')>-1){
		if(!s.prop47) s.prop47=s.getQueryParam('page');
		if(!s.prop14) s.prop14=s.getQueryParam('Search_Arg,SA');
		if(!s.prop15) s.prop15=s.getQueryParam('Search_Code,SC');
		if(!s.prop16) s.prop16=s.getQueryParam('ti');
		if(!s.prop17) s.prop17=s.getQueryParam('v1');
		if(!s.prop18) s.prop18=s.getQueryParam('v2');
		if(!s.prop19) s.prop19=s.getQueryParam('v3');
		if(!s.prop20) s.prop20=s.getQueryParam('v4');
		if(!s.prop21) s.prop21=s.getQueryParam('PostSearchSortBy1');
		if(!s.prop22) s.prop22=s.getQueryParam('HD');
		if(!s.prop23) s.prop23=s.getQueryParam('BROWSE');
		if(!s.prop24) s.prop24=s.getQueryParam('HC');
		if(!s.prop25) s.prop25=s.getQueryParam('RefCodes');
	}

	/** NDNP - Remove when using the new share tool */
	if (s.currentURL.indexOf('chroniclingamerica.loc.gov')>-1){
		if(!s.prop47) s.prop47=s.getQueryParam('page');
		if(!s.prop41) s.prop41=s.getQueryParam('sort');

		elem=document.getElementById("eVar4");
		if(elem){
			attr=elem.getAttributeNode("value");
			if(attr) s.eVar4=attr.value;
		}
		elem=document.getElementById("prop13");
		if(elem){
			attr=elem.getAttributeNode("value");
			if(attr) s.prop13=attr.value;
		}
		if(!s.prop15) s.prop15=s.getQueryParam('searchType');
		if(!s.prop20) s.prop20=s.getQueryParam('lccn');
		if(!s.prop21) s.prop21=s.getQueryParam('dateFilterType');
		if(!s.prop22) s.prop22=s.getQueryParam('year');
		if(!s.prop23) s.prop23=s.getQueryParam('date1');
		if(!s.prop24) s.prop24=s.getQueryParam('date2');
		if(!s.prop25) s.prop25=s.getQueryParam('ortext');
		if(!s.prop26) s.prop26=s.getQueryParam('andtext');
		if(!s.prop27) s.prop27=s.getQueryParam('phrasetext');
		if(!s.prop28) s.prop28=s.getQueryParam('proxtext');
		if(!s.prop29) s.prop29=s.getQueryParam('proximityValue');
		if(!s.prop30) s.prop30=s.getQueryParam('state');
		if(!s.prop31) s.prop31=s.getQueryParam('county');
		if(!s.prop32) s.prop32=s.getQueryParam('city');
		if(!s.prop33) s.prop33=s.getQueryParam('year1');
		if(!s.prop34) s.prop34=s.getQueryParam('year2');
		if(!s.prop35) s.prop35=s.getQueryParam('terms');
		if(!s.prop36) s.prop36=s.getQueryParam('frequency');
		if(!s.prop37) s.prop37=s.getQueryParam('language');
		if(!s.prop38) s.prop38=s.getQueryParam('ethnicity');
		if(!s.prop39) s.prop39=s.getQueryParam('labor');
		if(!s.prop40) s.prop40=s.getQueryParam('materialType');
		if(!s.prop40) s.prop40=s.getQueryParam('material_type');
		if(!s.prop17) s.prop17=s.getQueryParam('sequence');
	}

	/** PAE - Remove when using the new share tool */
	if (s.currentURL.indexOf('performingarts')>-1){
		if(!s.prop47) s.prop47=s.getQueryParam('page');
	}

	/** digitizationguidelines.gov - Remove when using the new share tool */
	if (s.currentURL.indexOf('digitizationguidelines.gov')>-1){
		if(!s.prop14) s.prop14=s.getQueryParam('term');
		if(!s.prop15) s.prop15=s.getQueryParam('qt');
	}

	/** LOC MAIN **/
	if (s.currentURL.indexOf('loc.gov')>-1){
		if(!s.prop13) s.prop13=s.getQueryParam('filter');
		if(!s.prop14) s.prop14=s.getQueryParam('search_button');
		if(!s.prop17) s.prop17=s.getQueryParam('rec');
		/** prop42 is being set to exit link above and loc.gov needs it to be set to ethnicity, we are overriding it here */
		/* s.prop42="all humankind"; */
   if(s.currentURL.indexOf('subject_ethnicity')>-1) {
      var start=s.currentURL.indexOf('?');
      var substring=s.currentURL.substring(start);
      var queries=substring.split("&");
      for (i = 0; i < queries.length; ++i) {
        if (queries[i].search('subject_ethnicity')>-1) {
          s.prop42=queries[i].split(":")[1];
          break;
        }
      }
    }
	}
	/** Capture Referrer as per Metrics ticket#24 **/
	if(!s.prop58) s.prop58=document.referrer;

	//this is the preferred plugin architecture point
	if( window.Site && window.Site.Plugins && window.Site.Plugins.sc && window.Site.Plugins.sc.setProperties){
		window.Site.Plugins.sc.setProperties(s);
	}

	if(window['doPageMetricsPlugin']){
		try{
			doPageMetricsPlugin(s);
		}catch(e){
			//swallow
		}
	}

	/** BUILD HIERARCHY **/
	if (s.prop49 !== undefined){
		var temp_hier = s.prop49;//level 1
		if (s.prop12 !== undefined){//level 2
			temp_hier += '|' + s.prop12;
		}else{
			temp_hier += '|No Set Referral';//place holder
		}
		if (s.prop11 !== undefined){//level 3
			temp_hier += '|' + s.prop11;
		}
		s.hier1 = temp_hier;
	}

	/** DIRECTORY URL **/
	if (s.currentURL) {
		s.dir1=s.channelExtract("/",4,s.currentURL);
		s.dir2=s.channelExtract("/",5,s.currentURL);
		s.dir3=s.channelExtract("/",6,s.currentURL);
		s.dir4=s.channelExtract("/",7,s.currentURL);
		if (s.dir1) s.prop61 = s.dir1;
		if (s.dir2) s.prop62 = s.dir2;
		if (s.dir3) s.prop63 = s.dir3;
		if (s.dir4) s.prop64 = s.dir4;
	}

	//Code that needs to be called after page-specific metrics code
	if( window.Site && window.Site.Plugins && window.Site.Plugins.sc && window.Site.Plugins.sc.afterDoPageMetricsPlugin){
		window.Site.Plugins.sc.afterDoPageMetricsPlugin(s);
	}
}
s.doPlugins=s_doPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */


/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");



/* Adobe Consulting Plugin: performanceTiming v.3BETA (Requires AppMeasurement, getPreviousValue recommended) */
s.performanceTiming=function(av){var s=this;try{(av&&(s.ptv=av),"undefined"!==typeof performance)?(s.performanceClear(),performance.clearResourceTimings(),""!==s.c_r("s_ptc")&&s.performanceRead(),0===performance.timing.loadEventEnd)?s.pi=setInterval(function(){s.performanceWriteFull()},250):0<performance.timing.loadEventEnd&&(s.ptc?s.ptc===performance.timing.loadEventEnd&&1===performance.getEntries().length&&(s.pwp=setInterval(function(){s.performanceWritePart()},500)):s.performanceWriteFull()):"undefined"!==typeof s.linkType&&"e"===s.linkType&&s.performanceRead()}catch(c){}};
s.performanceClear=function(){for(var s=this,b="pt.rdr pt.apc pt.dns pt.tcp pt.req pt.rsp pt.prc pt.onl pt.tot pt.pfi pt.ppi".split(" "),a=0;a<b.length;a++)s.contextData[b[a]]="";s[s.ptv]=""};
s.performanceWriteFull=function(){var s=this;try{if(0<performance.timing.loadEventEnd&&(clearInterval(s.pi),""===s.c_r("s_ptc"))){var a=performance.timing,b="";b="pt.rdr$"+s.performanceCheck(a.fetchStart,a.navigationStart);b+="^^pt.apc$"+s.performanceCheck(a.domainLookupStart,a.fetchStart);b+="^^pt.dns$"+s.performanceCheck(a.domainLookupEnd,a.domainLookupStart);b+="^^pt.tcp$"+s.performanceCheck(a.connectEnd,a.connectStart);b+="^^pt.req$"+s.performanceCheck(a.responseStart,a.connectEnd);b+="^^pt.rsp$"+s.performanceCheck(a.responseEnd,a.responseStart);b+="^^pt.prc$"+s.performanceCheck(a.loadEventStart,a.domLoading);b+="^^pt.onl$"+s.performanceCheck(a.loadEventEnd,a.loadEventStart);b+="^^pt.tot$"+s.performanceCheck(a.loadEventEnd,a.navigationStart);s.c_w("s_ptc",b+"^^pt.pfi$1");s.ptv&&s.performanceGetEntries()}}catch(c){return}s.ptc=performance.timing.loadEventEnd};
s.performanceWritePart=function(){var s=this;0<performance.getEntries().length&&(s.ppfe===performance.getEntries().length?clearInterval(s.pwp):s.ppfe=performance.getEntries().length);try{s.tempPe=((performance.getEntries()[performance.getEntries().length-1].responseEnd-performance.getEntries()[0].startTime)/1E3).toFixed(2);s.ptv&&s.performanceGetEntries();var a="pt.rsp$"+s.tempPe+"^^pt.tot$"+s.tempPe+"^^pt.ppi$1";s.c_w("s_ptc",a)}catch(b){}};
s.performanceGetEntries=function(){var s=this;if(""===s.c_r("s_ptc"))try{if(s.c_w("s_ptc",s.tempPe),sessionStorage&&"undefined"!==typeof s.ptv){s.tempPe="";var b=performance.getEntries(),c=b.length,a;for(a=0;a<c;a++)s.tempPe+="!",s.tempPe+=-1<b[a].name.indexOf("?")?b[a].name.split("?")[0]:b[a].name,s.tempPe+="|"+(Math.round(b[a].startTime)/1E3).toFixed(1)+"|"+(Math.round(b[a].duration)/1E3).toFixed(1)+"|"+b[a].initiatorType;sessionStorage.setItem("s_pec",s.tempPe)}}catch(d){}};
s.performanceCheck=function(a,b){if(0<=a&&0<=b)return 6E4>a-b&&0<=a-b?parseFloat((a-b)/1E3).toFixed(2):600};
s.performanceRead=function(){var c=this.c_r("s_ptc").split("^^"),d=c.length,a;0<performance.timing.loadEventEnd&&clearInterval(this.pi);for(a=0;a<d;a++){var b=c[a].split("$");this.contextData[b[0]]=b[1];"pt.tot"===b[0]&&(this._totalPageLoadTime=b[1])}this.c_w("s_ptc","",0);"undefined"!==typeof this.ptv&&("undefined"!==typeof sessionStorage?(this[this.ptv]=sessionStorage.getItem("s_pec"),sessionStorage.removeItem("s_pec")):this[this.ptv]="sessionStorage Unavailable")};
/* Adobe Consulting Plugin: getPreviousValue v2.0 (Requires AppMeasurement) */
s.getPreviousValue=function(vtc,cn,el){var s=this,g="",a=!0;cn=cn?cn:"s_gpv";if(el){a=!1;el=el.split(",");for(var h=s.events?s.events.split(","):"",e=0,k=el.length;e<k;e++){for(var f=0,l=h.length;f<l;f++)if(el[e]===h[f]){a=!0;break}if(!0===a)break}}!0===a&&(a=new Date,a.setTime(a.getTime()+18E5),s.c_r(cn)&&(g=s.c_r(cn)),vtc?s.c_w(cn,vtc,a):s.c_w(cn,"no previous value",a));return g};

/*
 * Copyright 2011-2013 Adobe Systems, Inc.
 * s_getLoadTime v1.36 - Get page load time in units of 1/10 seconds
 * 
 * ADDED on 3/9/2017 to introduce the option to measure site speed
*/
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}
 
/*
 *	getQueryParam v2.5 - H-code and AppMeasurement Compatible
 */ 
s.getQueryParam=function(p,d,u,h){var s=this,v="",i,j,t;d=d?d:"";u=u?u:s.pageURL?s.pageURL:s.wd?s.wd.location:window.location;while(p){i=p.indexOf(",");i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+"",h);if(t)t=t.indexOf("#")>-1?t.substring(0,t.indexOf("#")):t;if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v};
s.p_gpv=function(k,u,h){var s=this,v="",q;j=h==1?"#":"?";i=u.indexOf(j);if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,"&","p_gvf",k)}return v};
s.p_gvf=function(t,k){if(t){var s=this,i=t.indexOf("="),p=i<0?t:t.substring(0,i),v=i<0?true:t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa?s.epa(v):s.unescape(v)}return""};

/*
 *	pt - utility function
 */ 
s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:""}return""};
/*
 * Utility: escp 0.1 - ensures decodeURI will be used to decode URL
 * parameters if it exists
 */
s.escp=new Function("x",""
	+"var s=this;if(typeof(decodeURI)=='function'&&x)return decodeURI(s.r"
	+"ep(''+x,'+',' '));else return unescape(s.rep(''+x,'+',' '));");

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
	+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
	+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
	+" v==k?'':v");

/*
 * Plugin: exitLinkHandler 0.5 - identify and report exit links
 */
s.exitLinkHandler=new Function("p",""
	+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
	+"e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
	+"s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
	+"nkType='e';else h='';s[n]=t;return h;");
/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
	+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
	+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
	+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
	+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/*
 * Plugin: getClientTime 0.1 - Returns the time of day OR day of week
 */
s.getClientTime=new Function("v","i",""
	+"var dc=new Date('1/1/2000'),d=new Date(),x;if(dc.getDay()!=6)return"
	+";if(v=='t'){var h=d.getHours(),m=d.getMinutes(),r,ap='AM';if(h>=12)"
	+"{ap='PM';h=h-12}if(h==0)h=12;if(i==30){r='30';if(m<30)r='00';}if(i="
	+"=15){r='45';if(m<45)r='30';if(m<30)r='15';if(m<15)r='00';}return h+"
	+"':'+r+ap;}if(v=='d'){var n=d.getDay(),o=['Sunday','Monday','Tuesday"
	+"','Wednesday','Thursday','Friday','Saturday'];return o[n];}");

/*
 * getGoogleRank v1.0
 */
s.getGoogleRank=new Function("ce,ie,ev1,ev2,dn",""
	+"var s=this,dr,rd,p,pa,kr,kw,dn=dn||'';qp='resnum,cd';dr=s.referrer|"
	+"|typeof s.referrer!='undefined'?s.referrer:document.referrer;if(!dr"
	+"||!ce||!ie)return;rd=s.split(dr,'/');if(rd[2].substring(0,11)!='www"
	+".google.')return;kw=s.getQueryParam('q,as_q',' ',dr);if(!kw)return;"
	+"if(ev1)s[ev1]=kw;kr=rd[3].substring(0,4)=='url?'?s.getQueryParam(qp"
	+",'|',dr):'';if(kr.indexOf('|')>-1)kr=kr.substring(0,kr.indexOf('|')"
	+");if(!kr||kr=='0'){if(ev2)s[ev2]='no rank available';return;}if(ev2"
	+")s[ev2]=kr;p=s.products;pa=s.split(p,',');pa[0]=s.split(pa[0],';');"
	+"pa[0][0]=pa[0][0]||'';pa[0][1]=pa[0][1]||dn;pa[0][2]=pa[0][2]||'';p"
	+"a[0][3]=pa[0][3]||'';pa[0][4]=s.apl(pa[0][4],ie+'='+kr,'|',2);pa[0]"
	+"=s.join(pa[0],{delim:';'});pa=s.join(pa,{delim:','});s.events=s.apl"
	+"(s.events,ce,',',2);s.events=s.apl(s.events,ie,',',2);s.products=pa"
	+";return;");

s.channelExtract=new Function("d","p","u","pv",""
	+"var s=this,v='';li=u.lastIndexOf(d);if(li>0){u=u.substring(0,li);va"
	+"r i,n,a=s.split(u,d),al=a.length;if(al<p){if(pv==1) p=al;else retur"
	+"n '';}for(i=p-1;i<p;i++){n=a[i];v=v+n;}return v;}return '';");
/*
 /*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
	+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
	+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
	+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * s.join: 1.0 - s.join(v,p)
 */

s.join = new Function("v","p",""
	+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
	+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
	+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
	+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
	+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
	+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
	+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
	+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Function - read combined cookies v 0.3
 *//*
if(!s.__ccucr){s.c_rr=s.c_r;s.__ccucr = true;
	s.c_r=new Function("k",""
		+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
		+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
		+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
		+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
		+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
		+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
		+"urn v;");}
*/
/*
 * Function - write combined cookies v 0.3
 *//*
if(!s.__ccucw){s.c_wr=s.c_w;s.__ccucw = true;
	s.c_w=new Function("k","v","e",""
		+"this.new2 = true;"
		+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
		+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
		+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
		+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
		+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
		+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
		+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
		+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
		+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
		+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
		+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");}
*/
s.loadModule("Media")
s.Media.onLoad = function(s,m) {
	s.Media.trackVars="events,prop4,eVar11,eVar12,eVar13";
	s.Media.trackEvents="event21,event22,event23,event24,event25,event26,event27"
    s.Media.trackMilestones="25,50,75";
    s.Media.playerName="LOC Media Player";
    s.Media.segmentByMilestones = true;
    s.Media.trackUsingContextData = true;
    s.Media.contextDataMapping = {
        "a.media.name":"eVar11,prop4",
        "a.media.segment":"eVar12",
        "a.contentType":"eVar13",
        "a.media.timePlayed":"event21",
        "a.media.view":"event22",
        "a.media.complete":"event23",
        "a.media.segmentView":"event24",
        "a.media.milestones":{
            25:"event25",
            50:"event26",
            75:"event27"
        }
    };
};
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}



/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.4.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.4.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();
