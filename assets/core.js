(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{231:function(e,n,t){e.exports=t(582)},581:function(e,n,t){},582:function(e,n,t){"use strict";t.r(n);t(232),t(240),t(241),t(242),t(243),t(244),t(245),t(246),t(247),t(248),t(249),t(250),t(251),t(252),t(253),t(254),t(255),t(256),t(257),t(258),t(259),t(260),t(261),t(263),t(110),t(264),t(265),t(266),t(267),t(268),t(269),t(270),t(271),t(272),t(273),t(274),t(276),t(277),t(278),t(280),t(281),t(282),t(149),t(284),t(285),t(286),t(287),t(288),t(289),t(290),t(291),t(292),t(293),t(294),t(296),t(297),t(298),t(299),t(300),t(301),t(302),t(303),t(304),t(305),t(306),t(307),t(308),t(309),t(310),t(311),t(313),t(314),t(315),t(316),t(317),t(318),t(319),t(320),t(321),t(322),t(323),t(324),t(325),t(326),t(327),t(328),t(329),t(330),t(331),t(332),t(333),t(334),t(335),t(337),t(338),t(349),t(350),t(351),t(353),t(354),t(355),t(356),t(357),t(358),t(359),t(360),t(361),t(362),t(363),t(364),t(205),t(366),t(367),t(368),t(370),t(371),t(372),t(373),t(206),t(374),t(375),t(376),t(377),t(378),t(379),t(380),t(381),t(382),t(383),t(384),t(386),t(388),t(389),t(390),t(391),t(392),t(393),t(394),t(395),t(396),t(397),t(398),t(399),t(400),t(401),t(403),t(404),t(405),t(406),t(407),t(408),t(409),t(410),t(411),t(412),t(413),t(415),t(418),t(419),t(420),t(421),t(422),t(423),t(424),t(425),t(426),t(428),t(429),t(430),t(431),t(432),t(433),t(434),t(435),t(436),t(437),t(438),t(439),t(160),t(441),t(443),t(450),t(451),t(452),t(453),t(454),t(456),t(457),t(458),t(459),t(460),t(461),t(462),t(463),t(465),t(466),t(467),t(468),t(469),t(470),t(471),t(472),t(473),t(474),t(475),t(476),t(477),t(478),t(479),t(480),t(481),t(482),t(483),t(484),t(485),t(486),t(487),t(488),t(492),t(494),t(496),t(497),t(498),t(499),t(500),t(502),t(503),t(504),t(505),t(506),t(507),t(508),t(509),t(510),t(511),t(512),t(513),t(514),t(515),t(516),t(517),t(518),t(519),t(520),t(521),t(522),t(523),t(524),t(525),t(526),t(527),t(529),t(531),t(532),t(533),t(534),t(535),t(536),t(537),t(538),t(539),t(540),t(541),t(543),t(544),t(547),t(548),t(551),t(552);var r,a=t(3),o=t(81),i=t.n(o),l=t(54),s=t(130),c=t(1),u=t.n(c),d=t(16),f=t.n(d),p=t(225),m=t(230).a.div(r||(r=Object(p.a)(["\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n"]))),b=function(e){var n=Object(c.useState)(""),t=n[0],r=n[1],a=function(n){n?"maxSelectedOptions"===n.type&&r(e.selectErrorMessage):r("")};return u.a.createElement("div",null,u.a.Children.map(e.children,(function(e){return u.a.isValidElement(e)?u.a.cloneElement(e,{onError:a}):e})),t?u.a.createElement(m,{className:"data-selector--wrapper"},t):null)};b.propTypes={selectErrorMessage:f.a.string,children:f.a.node};var v=b,g=t(226),y=t(229),h={control:function(e){return Object.assign({},e,{borderColor:"#ddd",borderRadius:"none",boxShadow:"none",":hover":{borderColor:"#8f1b13"},":active":{borderColor:"#8f1b13"}})},option:function(e){return Object.assign({},e,{fontSize:"14px"})},singleValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValueLabel:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{paddingRight:6})},multiValueRemove:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{display:"none"})},input:function(e){return Object.assign({},e,{fontSize:"14px"})},indicatorsContainer:function(e){return Object.assign({},e,{pointerEvents:"none"})}},w=function(e){var n=e.label,t=e.onError,r=e.maxSelectedOptions,o=e.defaultValue,i=e.singleSelectOptions,l=Object(s.a)(e,["label","onError","maxSelectedOptions","defaultValue","singleSelectOptions"]),u=Object(c.useState)(o),d=u[0],f=u[1];Object(c.useEffect)((function(){l.onChange&&l.onChange(d),t&&t()}),[d]);return Object(a.c)("div",{className:"labelled-data-selector--wrapper"},Object(a.c)("label",null,Object(a.c)("b",null,n)),Object(a.c)(y.a,Object(g.a)({},l,{value:d,onChange:function(e){if(l.isMulti)if(e.length){var n=e.findIndex((function(e){return i.find((function(n){return n.value===e.value}))}));l.isMulti&&e.length>1&&-1!==n?f(0===n?e.slice(1):[e[n]]):r&&e.length>r?t&&t({type:"maxSelectedOptions",message:"Only up to "+r+" selections allowed"}):f(e)}else f(o);else f(e)},css:{marginRight:"10px"},styles:h,isClearable:"undefined"!==l.isClearable?l.isClearable:d.length>1})))};w.propTypes={label:f.a.string,options:f.a.array,maxSelectedOptions:f.a.number,onChange:f.a.func,onError:f.a.func,defaultValue:f.a.array,singleSelectOptions:f.a.array,isMulti:f.a.bool,isClearable:f.a.bool},w.defaultProps={maxSelectedOptions:2,singleSelectOptions:[]};var S=w,x=function(e){var n=e.defaultDonor,t=e.onSelectDonor,r=Object(s.a)(e,["defaultDonor","onSelectDonor"]),a=Object(c.useState)(r.donors),o=a[0],i=a[1],l=Object(c.useState)(r.defaultDataType),d=l[0],f=l[1];Object(c.useEffect)((function(){i(r.donors)}),[r.donors]);return u.a.createElement(v,{selectErrorMessage:r.donorSelectErrorMessage},u.a.createElement(S,{label:"Select up to two donors",options:o.map((function(e){return{value:e,label:e,isCloseable:!0}})),defaultValue:[{value:n,label:n,isCloseable:!0}],isMulti:!0,onChange:t,css:{minWidth:"200px"},classNamePrefix:"donors-select",isClearable:!1}),u.a.createElement(S,{label:"Display data as",options:["Volumes","Proportions","%GNI"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:d,label:d}],value:d,onChange:function(e){f(e?e.value:r.defaultDataType),r.onSelectDataType&&r.onSelectDataType(e?e.value:r.defaultDataType)},css:{minWidth:"150px"},classNamePrefix:"donors-display-data-as"}))};x.propTypes={donors:f.a.array,donorSelectErrorMessage:f.a.string,onSelectDonor:f.a.func,onSelectDataType:f.a.func,defaultDonor:f.a.string,defaultDataType:f.a.string};var C=x,O=t(227),D=function(e){return new Promise((function(n){Object(O.parse)(e,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var t=e.data;return n(t)}})}))},_=function(e){var n,t=document.createElement("div");return(n=t.classList).add.apply(n,["spotlight-banner","data-selector--wrapper"]),e.parentElement.insertBefore(t,e),t},A={rainbow:["#e84439","#eb642b","#f49b21","#109e68","#0089cc","#893f90","#c2135b","#f8c1b2","#f6bb9d","#fccc8e","#92cba9","#88bae5","#c189bb","#e4819b"],default:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],sunflower:["#7d4712","#ba6b15","#df8000","#f7a838","#fac47e","#fedcab","#fee7c1","#feedd4"],marigold:["#7a2e05","#ac4622","#cb5730","#ee7644","#f4a57c","#facbad","#fcdbbf","#fde5d4"],rose:["#65093d","#8d0e56","#9f1459","#d12568","#e05c86","#f3a5b6","#f6b8c1","#f9cdd0"],lavendar:["#42184c","#632572","#732c85","#994d98","#af73ae","#cb98c4","#deb5d6","#ebcfe5"],bluebell:["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],leaf:["#08492f","#005b3e","#00694a","#3b8c62","#74bf93","#a2d1b0","#b1d8bb","#c5e1cb"],orange:["#973915","#d85b31","#eb642b","#f18e5e","#f4a57c","#f6bb9d"]},E=function(e,n){var t=n.selected,r=Object.values(t).filter((function(e){return e})).length;e.setOption({animation:!0}),0===r?Object.keys(t).forEach((function(n){e.dispatchAction({type:"legendSelect",name:n})})):t[n.name]||(e.dispatchAction({type:"legendSelect",name:n.name}),Object.keys(t).forEach((function(r){Object.prototype.hasOwnProperty.call(t,r)&&r!==n.name&&e.dispatchAction({type:"legendUnSelect",name:r})})))},N={color:A.default.concat(A.rainbow),legend:{left:"10%",top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{show:!0,trigger:"item",showContent:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{show:!0,showTitle:!1,feature:{saveAsImage:{title:"Save as PNG",pixelRatio:2}},right:20,tooltip:{show:!0,formatter:function(e){return"<div>"+e.title+"</div>"},textStyle:{fontFamily:"Geomanist Regular,sans-serif"}}},xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1},nameLocation:"end",nameTextStyle:{padding:[0,50,0,0]}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0}},j=function(e,n){window.addEventListener("resize",(function(){e.resize({width:n.clientWidth+"px",height:n.clientHeight+"px"})}),!0)},R=function(e){var n=e.some((function(e){return e.stack})),t=Array.from(new Set(e.map((function(e){return e.name})))).length,r=Math.max.apply(Math,e.reduce((function(e,n){var t=n.data;return e.concat(t.map((function(e){return e.value||0})))}),[]));return 0===r?"blank":(n?r*t<100:r<100)?"near":(n?r*t<1e3:r<1e3)?"middle":"far"},L=N,T="Volumes",V={Proportions:"Proportions",Volumes:"Absolute","%GNI":"%GNI"},I=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},k=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=I(n.Value),n}))},M=function(e){return e.filter((function(e){return"%GNI"===T?"Total HA"===e:"Total HA"!==e}))},F=function(){return"%GNI"===T?"line":"bar"},U=function(e,n,t,r,a){void 0===a&&(a="Proportion");var o=e.filter((function(e){return e.Donor.trim()===t&&e["IHA type"]===r&&e["Value type"]===a}));return n.map((function(e){return o.find((function(n){return n.Year===e}))}))},P=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},B=function(e){void 0===e&&(e="far");return"Volumes"!==T?{type:"value",axisLabel:{formatter:"{value}%"},name:"",max:"Proportions"===T?100:null}:{type:"value",axisLabel:{formatter:"{value}"},nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:{near:[-35,0,0,0],middle:[-45,0,0,0],far:[-60,0,0,0]}[e]},max:null}},$=function(e,n,t){var r=t.years,a=t.channels,o={color:A.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:r},yAxis:B(),series:M(a).map((function(e){return{name:e,data:U(n,r,"All donors",e,V[T]).map((function(e){return{value:e&&Number("Proportions"===T?100*e.value:e.value),emphasis:{focus:"self"}}})),type:F(),stack:"channels",tooltip:{trigger:"item",formatter:function(t){var r=n.find((function(n){return n["IHA type"]===e&&"All donors"===n.Donor&&""+n.Year===t.name&&n["Value type"]===V[T]})),a=e.includes("Multilateral HA")?e.replace("Multilateral HA","Multilateral Humanitarian Assistance"):e;return"All donors, "+t.name+" <br />"+a+": <strong>"+("Proportions"===T?t.value.toFixed(2)+"%":"US$"+P(I(r.Value),"decimal","never")+" million")+" </strong>"}},cursor:"auto"}}))};return o.yAxis=B(R(o.series)),L.toolbox.feature.saveAsImage.name="donors",e.setOption(i()(o,L),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){E(e,n)})),e},z=function(e,n,t){var r=t.donors,a=t.channels,o=t.years,i=k(n),l=F(),s=r.map((function(e){return M(a).map((function(n,t){return{name:"%GNI"!==T?n:e,data:U(i,o,e,n,V[T]).map((function(e){return{value:e&&"number"==typeof e.value?Number("Volumes"!==T?100*e.value:e.value):null,emphasis:{focus:"self"}}})),type:l,stack:"%GNI"!==T?e:void 0,symbol:"circle",symbolSize:10,connectNulls:"line"!==l&&void 0,tooltip:{trigger:"item",formatter:function(t){var r=i.find((function(r){return r["IHA type"]===n&&r.Donor===e&&""+r.Year===t.name&&r["Value type"]===V[T]})),a="Volumes"===T?"US$"+P(I(r.Value),"decimal","never")+" million":t.value.toFixed(2)+"%";return e+", "+t.name+" <br />"+n+": <strong>"+a+"</strong>"}},label:{show:"bar"===l&&(0===t&&r.length>1),position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:B(R(s)),series:s},{replaceMerge:["series"]})},G=function(){window.DICharts.handler.addChart({className:"dicharts--gha-donors",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);D("https://raw.githubusercontent.com/devinit/gha-data-visualisations/dev/public/assets/data/donor_interactive_data_long.csv").then((function(t){var r=_(e),o=Array.from(new Set(t.map((function(e){return e.Donor})))).sort(),i=Array.from(new Set(t.map((function(e){return e.Year})))).sort(),s=Array.from(new Set(t.map((function(e){return e["IHA type"]})))),c=window.echarts.init(e);$(c,k(t),{years:i,channels:s});var u=[];Object(l.createRoot)(r).render(Object(a.c)(C,{selectErrorMessage:"You can compare two donors. Please remove one before adding another.",donors:o,onSelectDataType:function(e){if(T=e||T,u.length){var n=t.filter((function(e){return u.includes(e.Donor)}));z(c,n,{donors:u,channels:s,years:i})}else $(c,k(t),{years:i,channels:s})},onSelectDonor:function(e){if(e.length){var n=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));u=e.map((function(e){return e.value})),z(c,n,{donors:u,channels:s,years:i})}else $(c,k(t),{years:i,channels:s})},defaultDonor:"All donors",defaultDataType:"Volumes",donorSelectErrorMessage:"You can compare two donors. Please remove one before adding another."})),n.hideLoading(),j(c,e)}))}))}}})},Y=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},H=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=Y(e.Proportions),n}))},q=function(e,n,t,r){var a=e.filter((function(e){return e.Donor.trim()===t&&e["Delivery channel"]===r}));return n.map((function(e){return a.find((function(n){return n.Year===e}))}))},W=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},J=function(e,n,t){var r=t.years,a=t.channels,o={color:A.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:r},yAxis:{type:"value",axisLabel:{formatter:"{value}%"},max:100},series:a.map((function(e){return{name:e,data:q(n,r,"All donors",e).map((function(e){return{value:e&&Number(100*e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",tooltip:{trigger:"item",formatter:function(t){var r=n.find((function(n){return n["Delivery channel"]===e&&"All donors"===n.Donor&&""+n.Year===t.name}));return"All donors, "+t.name+" <br />"+e+": <strong>"+Number(t.value,10).toFixed(2)+"%</strong> (US$"+W(Y(r["US$ millions, constant 2020 prices"]),"decimal","never")+" million)"}},cursor:"auto"}}))};return L.toolbox.feature.saveAsImage.name="funding-channels",e.setOption(i()(o,L),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){E(e,n)})),e},Z=function(){window.DICharts.handler.addChart({className:"dicharts--boilerplate-chart",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);D("https://raw.githubusercontent.com/devinit/gha-data-visualisations/dev/public/assets/data/funding-channels-interactive-data.csv").then((function(t){var r,a,o,i=_(e),s=Array.from(new Set(t.map((function(e){return e.Donor})))),c=Array.from(new Set(t.map((function(e){return e.Year})))),d=(r=Array.from(new Set(t.map((function(e){return e["Delivery channel"]})))),a=["Not reported","Other"],o=r.filter((function(e){return!a.includes(e)})),a.forEach((function(e){r.includes(e)&&o.push(e)})),o),f=window.echarts.init(e);J(f,H(t),{years:c,channels:d});var p=[];Object(l.createRoot)(i).render(u.a.createElement(v,{selectErrorMessage:"You can compare two donors. Please remove one before adding another."},u.a.createElement(S,{label:"Select up to two donors",options:s.map((function(e){return{value:e,label:e,isCloseable:!0}})),defaultValue:[{value:"All donors",label:"All donors",isCloseable:!0}],isMulti:!0,onChange:function(e){if(e.length){var n=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));p=e.map((function(e){return e.value})),function(e,n,t){var r=t.donors,a=t.channels,o=t.years,i=H(n),l=r.map((function(e){return a.map((function(n,t){return{name:n,data:q(i,o,e,n).map((function(e){return{value:e&&Number(100*e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:e,tooltip:{trigger:"item",formatter:function(t){var r=i.find((function(r){return r["Delivery channel"]===n&&r.Donor===e&&""+r.Year===t.name})),a=r?"<strong>"+(100*r.value).toFixed(2)+"%</strong> (US$"+W(Y(r["US$ millions, constant 2020 prices"]),"decimal","never")+" million)":"<strong>"+(100*r.value).toFixed(2)+"%</strong>";return e+", "+t.name+" <br />"+n+": "+a}},label:{show:0===t&&r.length>1,position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({series:l},{replaceMerge:["series"]})}(f,n,{donors:p,channels:d,years:c})}else J(f,H(t),{years:c,channels:d})},css:{minWidth:"200px"},classNamePrefix:"channels-chart-select",isClearable:!1}))),n.hideLoading(),j(f,e)}))}))}}})},K=t(164),Q=t.n(K),X=t(228),ee=function(e){var n=Object(c.useState)(e.donorRecipients),t=n[0],r=n[1],o=Object(c.useState)(e.defaultBreakdown),i=o[0],l=o[1],s=Object(c.useState)(e.defaultRecipient),u=s[0],d=s[1];Object(c.useEffect)((function(){r("By donor"===i?e.donorRecipients:e.orgTypeRecipients),e.onSelectBreakdown&&e.onSelectBreakdown(i,u)}),[i]),Object(c.useEffect)((function(){e.onSelectRecipient&&e.onSelectRecipient(u,i)}),[u]);return Object(a.c)(v,null,Object(a.c)(S,{classNamePrefix:"recipient-chart-select",label:"Select recipient",options:t.sort().map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultRecipient,label:e.defaultRecipient}],onChange:function(n){d(n.value||e.defaultRecipient)},css:{minWidth:"150px"}}),Object(a.c)(S,{classNamePrefix:"recipient-chart-breakdown",label:"Choose breakdown",options:["By donor","By type of organisation receiving funding"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultBreakdown,label:e.defaultBreakdown}],onChange:function(n){l(n.value||e.defaultBreakdown)},css:{minWidth:"300px"}}))};ee.propTypes={donorRecipients:f.a.array,orgTypeRecipients:f.a.array,defaultRecipient:f.a.string,defaultBreakdown:f.a.string,onSelectBreakdown:f.a.func,onSelectRecipient:f.a.func},ee.defaultProps={defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"};var ne=ee,te=new Intl.NumberFormat,re=function(e){return e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()).toFixed(2):null},ae=function(e,n){return void 0===n&&(n="Value"),e.map((function(e){var t=Object.assign({},e);return t.value=re(e[n]),t}))},oe=function(e,n,t,r){var a=e.filter((function(e){return e["Destination Country"].trim()===t&&e["Donor organisation"]===r}));return n.map((function(e){return a.find((function(n){return n.Year===e}))||null}))},ie=function(e,n,t){var r=["Destination Country","Recipient Org Type"],a=e.filter((function(e){return e[r[1]]===n}));return t.map((function(e){var n=a.find((function(n){return n.Year===e}));return{value:n&&re(n.value)||null,emphasis:{focus:"self"}}}))},le=function(e,n){var t=["US","EU institutions","Germany","UK","Saudi Arabia","All other donors"],r=e.filter((function(e){return e["Destination Country"].trim()===n}));return t.length>=5?t:Array.from(new Set(r.map((function(e){return e["Donor organisation"]})))).filter((function(e){return!t.includes(e)})).slice(0,5).concat(t)},se=function(e){void 0===e&&(e="far");return{type:"value",nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:{near:[-35,0,0,0],middle:[-45,0,0,0],far:[-54,0,0,0]}[e]}}},ce=function(e,n,t,r){var a=r.years,o=r.channels,l={color:A.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:a,position:"bottom"},series:o.map((function(e){return{name:e,data:oe(n,a,t,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br />10 largest recipients: <strong>US$"+te.format(Math.round(n.value))+" million</strong>"}},animation:!1}}))};return l.yAxis=se(R(l.series)),L.toolbox.feature.saveAsImage.name="recipients",e.setOption(i()(l,L),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){E(e,n)})),e},ue=function(e,n,t){var r=t.recipient,a=t.years,o=ae(n,"USD deflated millions"),i=le(n,r).map((function(e){return{name:e,data:oe(o,a,r,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:r,cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br/>"+r+": <strong>US$"+te.format(Math.round(n.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:se(R(i)),series:i},{replaceMerge:["series"]})},de=function(e,n,t){var r=t.recipient,a=t.years,o=function(e){var n=["Not reported","Other"],t=e.filter((function(e){return!n.includes(e)}));return n.forEach((function(n){e.includes(n)&&t.push(n)})),t}(function(e,n){var t=e.filter((function(e){return e["Destination Country"].trim()===n}));return Array.from(new Set(t.map((function(e){return e["Recipient Org Type"]}))))}(n,r)).map((function(e){return{name:e,data:ie(n,e,a),type:"bar",stack:r,cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return n.name+" <br/>"+e+": <strong>US$"+te.format(Math.round(n.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:se(R(o)),series:o},{replaceMerge:["series"]})},fe=function(){window.DICharts.handler.addChart({className:"dicharts--gha-recipients",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,function(){var e=Object(X.a)(Q.a.mark((function e(n){var t,r,a,o,i,s,c,d,f,p,m,b;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new window.DICharts.Chart(n.parentElement),e.next=3,D("https://raw.githubusercontent.com/devinit/gha-data-visualisations/dev/public/assets/data/recipients-by-donor.csv");case 3:return r=e.sent,e.next=6,D("https://raw.githubusercontent.com/devinit/gha-data-visualisations/dev/public/assets/data/recipients-by-org-type.csv");case 6:a=e.sent,o=_(n),i=Array.from(new Set(r.filter((function(e){return"Yes"===e["Top 10 recipient"]})).map((function(e){return e["Destination Country"]})))),s=Array.from(new Set(r.map((function(e){return e.Year})))),"Afghanistan","By donor",c=le(r,"Afghanistan"),d=Array.from(new Set(a.filter((function(e){return"Yes"===e["Top 10 recipient"]})).map((function(e){return e["Destination Country"]})))),f=window.echarts.init(n),ce(f,ae(r,"USD deflated millions"),"Afghanistan",{years:s,channels:c}),p="Afghanistan",m=function(e,n){if(void 0===n&&(n="By donor"),p=e||"Afghanistan","By donor"===n)if("10 largest recipients"!==p){var t=r.filter((function(e){return e["Destination Country"]===p}));ue(f,t,{recipient:p,years:s})}else p="10 largest recipients",ce(f,ae(r,"USD deflated millions"),"10 largest recipients",{years:s,channels:c});else de(f,a.filter((function(n){return n["Destination Country"]===e})),{recipient:e,years:s})},b=function(e,n){if("By donor"===e)if("10 largest recipients"!==n){var t=r.filter((function(e){return e["Destination Country"]===n}));ue(f,t,{recipient:n,years:s})}else ce(f,ae(r,"USD deflated millions"),"10 largest recipients",{years:s,channels:c});else de(f,a.filter((function(e){return e["Destination Country"]===n})),{recipient:n,years:s})},Object(l.createRoot)(o).render(u.a.createElement(ne,{donorRecipients:i,orgTypeRecipients:d,onSelectRecipient:m,onSelectBreakdown:b,defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"})),t.hideLoading(),j(f,n);case 23:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}})},pe=(t(580),function(e){var n=Object(c.useState)("Severity_score"),t=n[0],r=n[1];Object(c.useEffect)((function(){e.onSelectDimension(t)}),[t]);var a=[{name:"Severity_score",label:"Severity of crisis",icon:"https://devinit.org/assets/svg/icons/crisis-severity-icon.svg"},{name:"Climate_vulnerability",label:"Climate vulnerability",icon:"https://devinit.org/assets/svg/icons/climate-vulnerability-icon.svg"},{name:"COVID_vaccination_rate",label:"Covid-19 vaccination rate",icon:"https://devinit.org/assets/svg/icons/covid-vaccination-icon.svg"},{name:"Food_insecure_(millions)",label:"Food insecurity",icon:"https://dev.devinit.org/assets/svg/icons/food-security.svg"},{name:"People_in_need_(millions)",label:"People in need",icon:"https://devinit.org/assets/svg/icons/people-in-need-icon.svg"}];return u.a.createElement("ul",null,a.map((function(e){return u.a.createElement("li",{key:e.name,className:"mapFilterItem"},e.icon?u.a.createElement(u.a.Fragment,null,u.a.createElement("button",{onClick:function(){r(e.name)},className:t===e.name?"mapFilterButton mapFilterItem-active":"mapFilterButton"},u.a.createElement("img",{src:e.icon,alt:e.name,height:"20",width:"20",className:t===e.name?"":"icon-disabled"}),u.a.createElement("p",{className:"Food_insecure_(millions)"===e.name?"food-icon":""},e.label))):u.a.createElement("button",{onClick:function(){r(e.name)}},u.a.createElement("p",null,e.label)))})))});pe.propTypes={onSelectDimension:f.a.func};var me=pe,be="https://devinit.org/assets/svg/icons/response-plan-icon.svg",ve=function(e,n){return e?Math.round(Number(n)/Number(e)*100)+"% funded[US$"+n+" of US$"+e+"]":"None"},ge=function(e,n){var t=e.map((function(e){return{id:e.Country_ID,name:e.Country_name}})),r=Array.from(new Set(e.map((function(e){return e.Country_ID}))));return t.slice(0,r.length).find((function(e){return e.id===n})).name},ye=function(e){switch(e){case"Very high":return"#0c457b";case"High":return"#0071b1";case"Medium":return"#0089cc";case"Low":return"#5da3d9";case"Very low":return"#77adde";case"Not assessed":default:return"#E6E1E5"}},he=window.L.control({position:"bottomright"});he.onAdd=function(){return this.div=window.L.DomUtil.create("div","databox"),this.div.setAttribute("data-id","databoxContainer"),this.update(),this.div},he.update=function(e,n){var t,r,a;this.div.innerHTML=e?"<div>"+ge(n,e.iso_a3)+" <button id=closeDatabox><img src=https://devinit.org/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg alt=close height=20 width=20 ></img></button></div> <br> "+(t=e,[{value:(r=t["Country_response_plan_requirements_(US$,_million)"],a=t["Country_response_plan_coverage_(%)"],r?a+"% funded[US$"+Math.round(Number(a)/100*Number(r))+"  of US$"+r+"]":"None"),label:"Country response plan",icon:{image:be,text:"response-plan"}},{value:ve(t["Regional_response_plan_requirements_(US$,_million)"],t["Regional_response_plan_funding_(US$,_million)"]),label:"Regional response plan",icon:{image:be,text:"response-plan"}}]).map((function(e){return"<span><img src="+e.icon.image+" alt="+e.icon.text+" height=20 width=20 ></img><p>"+e.label+": "+e.value+"</p> </span>"})).join(""):"";var o=document.getElementById("closeDatabox");o&&o.addEventListener("click",(function(e){return function(e,n){e.stopPropagation(),n.update(),document.querySelector('[data-id="databoxContainer"]').style.display="none"}(e,he)}))};var we=function(e){return u.a.createElement("button",{className:"reset-button",onClick:e.onReset},"Reset")};we.propTypes={onReset:f.a.func};var Se=we,xe=function(e,n,t,r,a,o,i,l,s){var c,u=i;u.onAdd=function(){var n=window.L.DomUtil.create("div","legend"),t=[{score:"Not assessed",label:"No data"},{score:"Very low",label:"Very low"},{score:"Low",label:"Low"},{score:"Medium",label:"Medium"},{score:"High",label:"High"},{score:"Very high",label:"Very high"}],r=[{variable:"Severity_score",data:t},{variable:"Climate_vulnerability",data:t},{variable:"COVID_vaccination_rate",max:"0(%)",min:"100(%)"},{variable:"Food_insecure_(millions)",max:"26(million)",min:"0(million)"},{variable:"People_in_need_(millions)",max:"25(million)",min:"0(million)"}],a="Severity_score"!==e&&"Climate_vulnerability"!==e?'<p style="margin-right:1px;margin-top:5px;">'+r.find((function(n){return n.variable===e})).min+"<p>"+["#77adde","#5da3d9","#0089cc","#0071b1","#0c457b"].map((function(e){return'<span>\n          <i style="background:'+e+';border-radius:1px;margin-right:0;width:40px;"></i>\n        </span>'})).join("")+' <p style="margin-left:1px;margin-top:5px;">'+r.find((function(n){return n.variable===e})).max+"</p>":r.find((function(n){return n.variable===e})).data.map((function(e){return'<span><i style="background:'+ye(e.score)+'"></i><label>'+e.label+"</label></span>"})).join("");return n.innerHTML=a,n},u.addTo(n);var d,f=function(n){return{fillColor:"piecewise"===o.find((function(n){return n.name===e})).scaleType?t(n.properties[e]):t(n.properties[e],o.find((function(n){return n.name===e})).values,e),weight:1,opacity:1,color:"white",fillOpacity:1}},p=function(e){c.resetStyle(e.target),e.target.closePopup()},m=function(t,r){t.properties[e]||""===t.properties[e]?r.on({mouseover:function(n){return function(e,n,t,r){var a=e.target,o=document.querySelector('[data-id="databoxContainer"]');o&&"none"!==o.style.display&&(he.update(),o.style.display="none"),a.setStyle({fillColor:"#f7a838",color:"#484848",weight:2}),window.L.Browser.ie||window.L.Browser.opera||window.L.Browser.edge||a.bringToFront(),a.bindPopup("No data"!==a.feature.properties[n]&&"Not assessed"!==a.feature.properties[n]?"<div>"+ge(r,a.feature.properties.iso_a3)+"<br>"+t.find((function(e){return e.name===n})).label+": "+a.feature.properties[n]+'<span style="padding-left: 2px;">'+t.find((function(e){return e.name===n})).unit+"</span></div>":"<div>"+ge(r,a.feature.properties.iso_a3)+"<br> No data</div>").openPopup()}(n,e,o,s)},mouseout:p,click:function(e){return function(e,n,t,r){t.addTo(n);var a=e.target;t.update(a.feature.properties,r)}(e,n,he,s)}}):r.on({mouseover:function(){n.getContainer().querySelectorAll(".leaflet-interactive").forEach((function(e){e.classList+=" grab-cursor-enabled"}))},mouseout:function(){n.getContainer().querySelectorAll(".leaflet-interactive.grab-cursor-enabled").forEach((function(e){e.classList.remove("grab-cursor-enabled")}))}})};l.clearLayers(),c=window.L.geoJSON((d=a,r.map((function(e){var n=Object.assign({},e),t=d.find((function(n){return n.name===e.properties.name}));return t&&(n.properties=Object.assign({},e.properties,t)),n}))),{style:f,onEachFeature:m}),l.addLayer(c)};var Ce=function(){window.DICharts.handler.addChart({className:"dicharts--gha-people-affected-by-crisis-leaflet",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement),t=window.L.map(e,{maxZoom:3,minZoom:1,crs:window.L.CRS.EPSG4326,center:[0,0],zoom:1}),r=_(e),o=[{name:"Severity_score",label:"Severity of crisis",scaleType:"piecewise",unit:""},{name:"Climate_vulnerability",label:"Climate vulnerability",scaleType:"piecewise",unit:""},{name:"COVID_vaccination_rate",label:"Covid-19 vaccination rate",scaleType:"continous",values:[0,20,40,60,80,100],unit:"%"},{name:"Food_insecure_(millions)",label:"Food insecurity",scaleType:"continous",values:[26,21,16,11,6,0],unit:"million"},{name:"People_in_need_(millions)",label:"People in need",scaleType:"continous",values:[25,20,15,10,5,0],unit:"million"}],i=window.L.control({position:"topright"}),s=window.L.control({position:"bottomleft"}),c=function(e,n,t){return"No data"===e?"#E6E1E5":("COVID_vaccination_rate"===t?Number(e)<n[1]:Number(e)>n[1])?"#0c457b":("COVID_vaccination_rate"===t?Number(e)<n[2]:Number(e)>n[2])?"#0071b1":("COVID_vaccination_rate"===t?Number(e)<n[3]:Number(e)>n[3])?"#0089cc":("COVID_vaccination_rate"===t?Number(e)<n[4]:Number(e)>n[4])?"#5da3d9":("COVID_vaccination_rate"===t?Number(e)<=n[5]:Number(e)>=n[5])?"#77adde":"#E6E1E5"};n.showLoading(),window.fetch("https://raw.githubusercontent.com/devinit/gha-data-visualisations/dev/src/data/world_map.geo.json").then((function(e){return e.json()})).then((function(e){var u=e.features;D("https://raw.githubusercontent.com/devinit/gha-data-visualisations/dev/src/data/map_data_long.csv").then((function(e){var d,f=(d=u,e.map((function(e){var n=Object.assign({},e),t=d.find((function(e){return e.properties.iso_a3===n.Country_ID}));return t&&(n.Country_name=t.properties.name),n}))),p=function(e,n){var t=[];return e.forEach((function(e){var r={};r.name=e,n.forEach((function(n){n.Country_name===e&&(r[n.variable]=n.value)})),t.push(r)})),t}(Array.from(new Set(f.map((function(e){return e.Country_name})))),f),m=window.L.featureGroup().addTo(t),b=function(){t.setView([0,0],1)};Object(l.createRoot)(r).render(Object(a.c)(me,{onSelectDimension:function(n){xe(n,t,"continous"===o.find((function(e){return e.name===n})).scaleType?c:ye,u,p,o,i,m,e)}})),s.onAdd=function(){var e=window.L.DomUtil.create("div");return Object(l.createRoot)(e).render(Object(a.c)(Se,{onReset:b})),e},s.addTo(t),xe("Severity_score",t,"continous"===o.find((function(e){return"Severity_score"===e.name})).scaleType?c:ye,u,p,o,i,m,e),n.hideLoading()}))})).catch((function(e){return console.log(e)}))}))}}})};t(581);window.addEventListener("load",(function(){G(),Z(),fe(),Ce()}))}},[[231,1,2]]]);