 
function t390_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');
  
  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t390_closePopup();
    }
  });

  el.find('.t-popup__close').click(function(e){
    t390_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t390_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t390_closePopup(); }
  });
}

function t390_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
  
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t390_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t390_showPopup(recid);
      t390_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided ??? hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];} 
 
function t776__init(recid){
  setTimeout(function(){
    t_prod__init(recid);
    t776_initPopup(recid);
    t776__hoverZoom_init(recid);
    t776__updateLazyLoad(recid);
    t776__alignButtons_init(recid);
  }, 500);
}

function t776__alignButtons_init(recid) {
    var rec = $('#rec' + recid);
    if (rec.find('[data-buttons-v-align]')[0]) {
        try {
            t776__alignButtons(recid);
            $(window).bind(
                'resize',
                t_throttle(function() {
                    if (
                        typeof window.noAdaptive !== 'undefined' &&
                        window.noAdaptive === true &&
                        $isMobile
                    ) {
                        return;
                    }
                    t776__alignButtons(recid);
                }, 200)
            );

            $('.t776').bind('displayChanged', function() {
                t776__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t776__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t776__alignButtons(recid) {
    var rec = $('#rec'+recid);
    var wrappers = rec.find('.t776__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t776__container_mobile-flex')[0] ? true: false;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t776 .mobile-two-columns')[0] ? true: false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }
    
    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var wrappersInRow = [];
    
    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto';
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight;
            }

            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px';
            });
            
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = [];
            }

            i++;
        }
    });
}

function t776__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t776__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t776__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t776_initPopup(recid){
  var rec=$('#rec'+recid); 
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t776__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){	
      e.preventDefault();
      t776_showPopup(recid);	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');

    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

      var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }
      t776_updateSlider(recid+' #t776__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t776_checkUrl(recid); }
  t776_copyTypography(recid);
}

function t776_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t776_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t776_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t776_closePopup();
    }
  });

  el.find('.t-popup__close, .t776__close-text').click(function(e){
    t776_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t776_closePopup();
    }
  });
}

function t776_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);
  setTimeout(function() {
    $(".t-popup").scrollTop(0);  
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }                                                                        	
  }, 300);
}

function t776_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}			
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t776_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t776__title').attr('style');
	var descrStyle=rec.find('.t776__descr').attr('style');
	rec.find('.t-popup .t776__title').attr("style",t776_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t776__descr, .t-popup .t776__text').attr("style",t776_removeSizeStyles(descrStyle));
} 
function t796_init(recid) {
    var el = $("#rec" + recid);
    var shapeEl = el.find(".t796__shape-border");
    var recs = el.find(".t796").attr("data-shape-rec-ids");

    if (typeof recs != "undefined") {
        recs = recs.split(",");
        /* append to certain blocks */
        recs.forEach(function(rec_id, i, arr) {
            var curRec = $("#rec" + rec_id);
            var curShapeEl = shapeEl.clone();
            t796_setColor(el,curShapeEl);
            t796_addDivider(curRec, curShapeEl);
        });
    } else {
        var excludes = "[data-record-type='215'],[data-record-type='706'],[data-record-type='651'],[data-record-type='825'],[data-record-type='708']";

        if (shapeEl.hasClass('t796__shape-border_top') || shapeEl.hasClass('t796__shape-border_top-flip')) {
            var curRec = el.next(".r");
            if (curRec.is(excludes)) {
                curRec = curRec.next(".r");
            }
        }

        if (shapeEl.hasClass('t796__shape-border_bottom') || shapeEl.hasClass('t796__shape-border_bottom-flip')) {
            var curRec = el.prev(".r");
            if (curRec.is(excludes)) {
                curRec = curRec.prev(".r");
            }
        }

        if (curRec.length != 0) {
            var curShapeEl = shapeEl.clone();
            t796_setColor(el, curShapeEl);
            t796_addDivider(curRec, curShapeEl);
        }
    }
}


function t796_addDivider(curRec, curShapeEl) {
    curRec.attr("data-animationappear","off").removeClass('r_hidden');
    var coverWrapper = curRec.find(".t-cover");
    var zeroWrapper = curRec.find(".t396");
    if (coverWrapper.length > 0 || zeroWrapper.length > 0) {
        /* if cover or zero */
        if (coverWrapper.length > 0) {
            coverWrapper.find(".t-cover__filter").after(curShapeEl);
        }
        if (zeroWrapper.length > 0) {
           zeroWrapper.after(curShapeEl);
           curRec.css("position", "relative");
        }
        curShapeEl.css("display", "block");
    } else {
        /*if any block*/
        var wrapper = curRec;
        var curRecType = curRec.attr("data-record-type");
        if (wrapper.length == 0) {
            return true;
        }
        wrapper.append(curShapeEl);
        wrapper.css("position", "relative");
        if (curRecType != "554" && curRecType != "125") {
            wrapper.children("div").first().css({
                "position": "relative",
                "z-index": "1"
            }).addClass("t796_cont-near-shape-divider");
        }
        if (curRecType == "734" || curRecType == "675" || curRecType == "279" || curRecType == "694") {
            curShapeEl.css("z-index", "1");
        }
        curShapeEl.css("display", "block");
    }
}


function t796_setColor(el,curShapeEl) {
    /* get color from nearest block, if it is not set for curShape */
    if (typeof curShapeEl.attr("data-fill-color") != "undefined") {
        return;
    }

    if (curShapeEl.hasClass("t796__shape-border_bottom") || curShapeEl.hasClass("t796__shape-border_bottom-flip")) {
        var nearestBlock = el.next(".r");
    } else {
        var nearestBlock = el.prev(".r");
    }

    if (nearestBlock.length == 0) {
        return;
    }

    var fillColor = nearestBlock.attr("data-bg-color");
    if (typeof fillColor == "undefined") {
        return;
    }

    curShapeEl.find(".t796__svg").css("fill",fillColor);
}
 
function t875_init(recid) {
    if (document.layers) {document.captureEvents(Event.MOUSEDOWN);}
    document.onmousedown = t875_click;
    document.oncontextmenu = function(event) {
            var event = event || window.event;
            var sender = event.target || event.srcElement;
            if (sender.tagName.match(/INPUT|TEXTAREA/i)) {
                return;
            } else {
                return false;
            }
    };
    t875_preventSelection(document);
    t875_preventUserSelect();
}


function t875_preventUserSelect() {
    $('body').css({'-ms-user-select': 'none', '-moz-user-select': 'none', '-webkit-user-select': 'none', 'user-select': 'none', '-webkit-touch-callout': 'none'});
}

function t875_click(event) {
    t875_returnPrevent(event);

    if (document.all) {
        if (event.button == 2) {
            return false;
        }
    }
    if (document.layers) {
        if (event.which == 3) {
            return false;
        }
    }
}


function t875_preventSelection(element) {
    var preventSelection = false;

    t875_addHandler(element, 'mousemove', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
    });

    t875_addHandler(element, 'mousedown', function(event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });

    t875_addHandler(element, 'mouseup', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
        preventSelection = false;
    });

    t875_addHandler(element, 'keydown', t875_killCtrlA);
    t875_addHandler(element, 'keyup', t875_killCtrlA);
    t875_addHandler(element, 'keydown', t875_killCtrlU);
    t875_addHandler(element, 'keyup', t875_killCtrlU);
    t875_addHandler(element, 'keydown', t875_killAltCmdI);
    t875_addHandler(element, 'keyup', t875_killAltCmdI);
    t875_addHandler(element, 'keydown', t875_killCtrlShiftI);
    t875_addHandler(element, 'keyup', t875_killCtrlShiftI);
}


function t875_addHandler(element, event, handler) {
    if (element.attachEvent) {
        element.attachEvent('on' + event, handler);
    } else {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        }
    }
}


function t875_removeSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.clear) {
        document.selection.clear();
    }
}


function t875_killCtrlU(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'U'.charCodeAt(0)) || (event.altKey && event.metaKey && (key == 'U'.charCodeAt(0) || key == 'u'.charCodeAt(0)))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killAltCmdI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.altKey && event.metaKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlShiftI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.shiftKey && event.ctrlKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlA(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA|BUTTON/i)) {return;}

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'A'.charCodeAt(0)) || (event.metaKey && key == 'A'.charCodeAt(0))) {
        t875_removeSelection();
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_returnPrevent(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA/i)) {return;}
}
