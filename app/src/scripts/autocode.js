if (window.location.protocol == 'https:') {
  window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
} else if (window.location.hostname == 'autocode.crystal.sh') {
  window.location.href = 'http://app.autocode.run';
}

CodeMirror.registerHelper('hint', 'anyword', function(editor, options) {
  var WORD = /[\w$]+/, RANGE = 500;
  
  var word = options && options.word || WORD;
  var range = options && options.range || RANGE;
  var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
  var end = cur.ch, start = end;
  while (start && word.test(curLine.charAt(start - 1))) --start;
  var curWord = start != end && curLine.slice(start, end);

  var list = [];
  for (var i in autocode.data.autocomplete) {
    if (curWord === false || autocode.data.autocomplete[i].match(curWord.replace(new RegExp('\\$', 'g'), '\\$'), 'i')) {
      var word = autocode.data.autocomplete[i];
      if (word.substr(0, 1) != '$') {
        word += ': ';
      }
      if (list.indexOf(autocode.data.autocomplete[i]) === -1) {
        list.push(word);
      }
    }
  }
  
  return {
    list: list,
    from: CodeMirror.Pos(cur.line, start),
    to: CodeMirror.Pos(cur.line, end)
  };
});

jQuery.fn.extend({
  visibleHeight: function() {
    var o = $(this);
    if (o.is(':hidden')) {
      return 0;
    } else {
      return o.outerHeight();
    }
  },
  visibleWidth: function() {
    var o = $(this);
    if (o.is(':hidden')) {
      return 0;
    } else {
      return o.outerWidth();
    }
  }
});

var autocode = {
  action: {},
  config: {},
  data: {
    current: {
      pin: true
    },
    exportTypes: ['engine','generator','helper','processor','schema','spec','transformer'],
    formats: [
      'c',
      'clojure',
      'coffeescript',
      'cpp',
      'csharp',
      'cson',
      'css',
      'd',
      'dart',
      'dockerfile',
      'erlang',
      'fsharp',
      'go',
      'haskell',
      'haxe',
      'html',
      'ini',
      'jade',
      'java',
      'javascript',
      'json',
      'markdown',
      'objectivec',
      'perl',
      'php',
      'python',
      'r',
      'ruby',
      'rust',
      'scala',
      'text',
      'yaml',
      'xml'
    ],
    licenses: {
      'Glide': '3dfx Glide License',
      'Abstyles': 'Abstyles License',
      'AFL-1.1': 'Academic Free License v1.1',
      'AFL-1.2': 'Academic Free License v1.2',
      'AFL-2.0': 'Academic Free License v2.0',
      'AFL-2.1': 'Academic Free License v2.1',
      'AFL-3.0': 'Academic Free License v3.0',
      'AMPAS': 'Academy of Motion Picture Arts and Sciences BSD',
      'APL-1.0': 'Adaptive Public License 1.0',
      'Adobe-Glyph': 'Adobe Glyph List License',
      'APAFML': 'Adobe Postscript AFM License',
      'Adobe-2006': 'Adobe Systems Incorporated Source Code License Agreement',
      'AGPL-1.0': 'Affero General Public License v1.0',
      'Afmparse': 'Afmparse License',
      'Aladdin': 'Aladdin Free Public License',
      'ADSL': 'Amazon Digital Services License',
      'AMDPLPA': "AMD\'s plpa_map.c License",
      'ANTLR-PD': 'ANTLR Software Rights Notice',
      'Apache-1.0': 'Apache License 1.0',
      'Apache-1.1': 'Apache License 1.1',
      'Apache-2.0': 'Apache License 2.0',
      'AML': 'Apple MIT License',
      'APSL-1.0': 'Apple Public Source License 1.0',
      'APSL-1.1': 'Apple Public Source License 1.1',
      'APSL-1.2': 'Apple Public Source License 1.2',
      'APSL-2.0': 'Apple Public Source License 2.0',
      'Artistic-1.0': 'Artistic License 1.0',
      'Artistic-1.0-Perl': 'Artistic License 1.0 (Perl)',
      'Artistic-1.0-cl8': 'Artistic License 1.0 w/clause 8',
      'Artistic-2.0': 'Artistic License 2.0',
      'AAL': 'Attribution Assurance License',
      'Bahyph': 'Bahyph License',
      'Barr': 'Barr License',
      'Beerware': 'Beerware License',
      'BitTorrent-1.0': 'BitTorrent Open Source License v1.0',
      'BitTorrent-1.1': 'BitTorrent Open Source License v1.1',
      'BSL-1.0': 'Boost Software License 1.0',
      'Borceux': 'Borceux license',
      'BSD-2-Clause': 'BSD 2-clause "Simplified" License',
      'BSD-2-Clause-FreeBSD': 'BSD 2-clause FreeBSD License',
      'BSD-2-Clause-NetBSD': 'BSD 2-clause NetBSD License',
      'BSD-3-Clause': 'BSD 3-clause "New" or "Revised" License',
      'BSD-3-Clause-Clear': 'BSD 3-clause Clear License',
      'BSD-4-Clause': 'BSD 4-clause "Original" or "Old" License',
      'BSD-Protection': 'BSD Protection License',
      'BSD-3-Clause-Attribution': 'BSD with attribution',
      '0BSD': 'BSD Zero Clause License',
      'BSD-4-Clause-UC': 'BSD-4-Clause (University of California-Specific)',
      'bzip2-1.0.5': 'bzip2 and libbzip2 License v1.0.5',
      'bzip2-1.0.6': 'bzip2 and libbzip2 License v1.0.6',
      'Caldera': 'Caldera License',
      'CECILL-1.0': 'CeCILL Free Software License Agreement v1.0',
      'CECILL-1.1': 'CeCILL Free Software License Agreement v1.1',
      'CECILL-2.0': 'CeCILL Free Software License Agreement v2.0',
      'CECILL-2.1': 'CeCILL Free Software License Agreement v2.1',
      'CECILL-B': 'CeCILL-B Free Software License Agreement',
      'CECILL-C': 'CeCILL-C Free Software License Agreement',
      'ClArtistic': 'Clarified Artistic License',
      'MIT-CMU': 'CMU License',
      'CNRI-Jython': 'CNRI Jython License',
      'CNRI-Python': 'CNRI Python License',
      'CNRI-Python-GPL-Compatible': 'CNRI Python Open Source GPL Compatible License Agreement',
      'CPOL-1.02': 'Code Project Open License 1.02',
      'CDDL-1.0': 'Common Development and Distribution License 1.0',
      'CDDL-1.1': 'Common Development and Distribution License 1.1',
      'CPAL-1.0': 'Common Public Attribution License 1.0',
      'CPL-1.0': 'Common Public License 1.0',
      'CATOSL-1.1': 'Computer Associates Trusted Open Source License 1.1',
      'Condor-1.1': 'Condor Public License v1.1',
      'CC-BY-1.0': 'Creative Commons Attribution 1.0',
      'CC-BY-2.0': 'Creative Commons Attribution 2.0',
      'CC-BY-2.5': 'Creative Commons Attribution 2.5',
      'CC-BY-3.0': 'Creative Commons Attribution 3.0',
      'CC-BY-4.0': 'Creative Commons Attribution 4.0',
      'CC-BY-ND-1.0': 'Creative Commons Attribution No Derivatives 1.0',
      'CC-BY-ND-2.0': 'Creative Commons Attribution No Derivatives 2.0',
      'CC-BY-ND-2.5': 'Creative Commons Attribution No Derivatives 2.5',
      'CC-BY-ND-3.0': 'Creative Commons Attribution No Derivatives 3.0',
      'CC-BY-ND-4.0': 'Creative Commons Attribution No Derivatives 4.0',
      'CC-BY-NC-1.0': 'Creative Commons Attribution Non Commercial 1.0',
      'CC-BY-NC-2.0': 'Creative Commons Attribution Non Commercial 2.0',
      'CC-BY-NC-2.5': 'Creative Commons Attribution Non Commercial 2.5',
      'CC-BY-NC-3.0': 'Creative Commons Attribution Non Commercial 3.0',
      'CC-BY-NC-4.0': 'Creative Commons Attribution Non Commercial 4.0',
      'CC-BY-NC-ND-1.0': 'Creative Commons Attribution Non Commercial No Derivatives 1.0',
      'CC-BY-NC-ND-2.0': 'Creative Commons Attribution Non Commercial No Derivatives 2.0',
      'CC-BY-NC-ND-2.5': 'Creative Commons Attribution Non Commercial No Derivatives 2.5',
      'CC-BY-NC-ND-3.0': 'Creative Commons Attribution Non Commercial No Derivatives 3.0',
      'CC-BY-NC-ND-4.0': 'Creative Commons Attribution Non Commercial No Derivatives 4.0',
      'CC-BY-NC-SA-1.0': 'Creative Commons Attribution Non Commercial Share Alike 1.0',
      'CC-BY-NC-SA-2.0': 'Creative Commons Attribution Non Commercial Share Alike 2.0',
      'CC-BY-NC-SA-2.5': 'Creative Commons Attribution Non Commercial Share Alike 2.5',
      'CC-BY-NC-SA-3.0': 'Creative Commons Attribution Non Commercial Share Alike 3.0',
      'CC-BY-NC-SA-4.0': 'Creative Commons Attribution Non Commercial Share Alike 4.0',
      'CC-BY-SA-1.0': 'Creative Commons Attribution Share Alike 1.0',
      'CC-BY-SA-2.0': 'Creative Commons Attribution Share Alike 2.0',
      'CC-BY-SA-2.5': 'Creative Commons Attribution Share Alike 2.5',
      'CC-BY-SA-3.0': 'Creative Commons Attribution Share Alike 3.0',
      'CC-BY-SA-4.0': 'Creative Commons Attribution Share Alike 4.0',
      'CC0-1.0': 'Creative Commons Zero v1.0 Universal',
      'Crossword': 'Crossword License',
      'CrystalStacker': 'CrystalStacker License',
      'CUA-OPL-1.0': 'CUA Office Public License v1.0',
      'Cube': 'Cube License',
      'D-FSL-1.0': 'Deutsche Freie Software Lizenz',
      'diffmark': 'diffmark license',
      'WTFPL': 'Do What The F*ck You Want To Public License',
      'DOC': 'DOC License',
      'Dotseqn': 'Dotseqn License',
      'DSDP': 'DSDP License',
      'dvipdfm': 'dvipdfm License',
      'EPL-1.0': 'Eclipse Public License 1.0',
      'ECL-1.0': 'Educational Community License v1.0',
      'ECL-2.0': 'Educational Community License v2.0',
      'eGenix': 'eGenix.com Public License 1.1.0',
      'EFL-1.0': 'Eiffel Forum License v1.0',
      'EFL-2.0': 'Eiffel Forum License v2.0',
      'MIT-advertising': 'Enlightenment License (e16)',
      'MIT-enna': 'enna License',
      'Entessa': 'Entessa Public License v1.0',
      'ErlPL-1.1': 'Erlang Public License v1.1',
      'EUDatagrid': 'EU DataGrid Software License',
      'EUPL-1.0': 'European Union Public License 1.0',
      'EUPL-1.1': 'European Union Public License 1.1',
      'Eurosym': 'Eurosym License',
      'Fair': 'Fair License',
      'MIT-feh': 'feh License',
      'Frameworx-1.0': 'Frameworx Open License 1.0',
      'FreeImage': 'FreeImage Public License v1.0',
      'FTL': 'Freetype Project License',
      'FSFUL': 'FSF Unlimited License',
      'FSFULLR': 'FSF Unlimited License (with License Retention)',
      'Giftware': 'Giftware License',
      'GL2PS': 'GL2PS License',
      'Glulxe': 'Glulxe License',
      'AGPL-3.0': 'GNU Affero General Public License v3.0',
      'GFDL-1.1': 'GNU Free Documentation License v1.1',
      'GFDL-1.2': 'GNU Free Documentation License v1.2',
      'GFDL-1.3': 'GNU Free Documentation License v1.3',
      'GPL-1.0': 'GNU General Public License v1.0 only',
      'GPL-2.0': 'GNU General Public License v2.0 only',
      'GPL-3.0': 'GNU General Public License v3.0 only',
      'LGPL-2.1': 'GNU Lesser General Public License v2.1 only',
      'LGPL-3.0': 'GNU Lesser General Public License v3.0 only',
      'LGPL-2.0': 'GNU Library General Public License v2 only',
      'gnuplot': 'gnuplot License',
      'gSOAP-1.3b': 'gSOAP Public License v1.3b',
      'HaskellReport': 'Haskell Language Report License',
      'HPND': 'Historic Permission Notice and Disclaimer',
      'IBM-pibs': 'IBM PowerPC Initialization and Boot Software',
      'IPL-1.0': 'IBM Public License v1.0',
      'ICU': 'ICU License',
      'ImageMagick': 'ImageMagick License',
      'iMatix': 'iMatix Standard Function Library Agreement',
      'Imlib2': 'Imlib2 License',
      'IJG': 'Independent JPEG Group License',
      'Intel-ACPI': 'Intel ACPI Software License Agreement',
      'Intel': 'Intel Open Source License',
      'Interbase-1.0': 'Interbase Public License v1.0',
      'IPA': 'IPA Font License',
      'ISC': 'ISC License',
      'JasPer-2.0': 'JasPer License',
      'JSON': 'JSON License',
      'LPPL-1.3a': 'LaTeX Project Public License 1.3a',
      'LPPL-1.0': 'LaTeX Project Public License v1.0',
      'LPPL-1.1': 'LaTeX Project Public License v1.1',
      'LPPL-1.2': 'LaTeX Project Public License v1.2',
      'LPPL-1.3c': 'LaTeX Project Public License v1.3c',
      'Latex2e': 'Latex2e License',
      'BSD-3-Clause-LBNL': 'Lawrence Berkeley National Labs BSD variant license',
      'Leptonica': 'Leptonica License',
      'LGPLLR': 'Lesser General Public License For Linguistic Resources',
      'Libpng': 'libpng License',
      'libtiff': 'libtiff License',
      'LPL-1.02': 'Lucent Public License v1.02',
      'LPL-1.0': 'Lucent Public License Version 1.0',
      'MakeIndex': 'MakeIndex License',
      'MTLL': 'Matrix Template Library License',
      'MS-PL': 'Microsoft Public License',
      'MS-RL': 'Microsoft Reciprocal License',
      'MirOS': 'MirOS Licence',
      'MITNFA': 'MIT +no-false-attribs license',
      'MIT': 'MIT License',
      'Motosoto': 'Motosoto License',
      'MPL-1.0': 'Mozilla Public License 1.0',
      'MPL-1.1': 'Mozilla Public License 1.1',
      'MPL-2.0': 'Mozilla Public License 2.0',
      'MPL-2.0-no-copyleft-exception': 'Mozilla Public License 2.0 (no copyleft exception)',
      'mpich2': 'mpich2 License',
      'Multics': 'Multics License',
      'Mup': 'Mup License',
      'NASA-1.3': 'NASA Open Source Agreement 1.3',
      'Naumen': 'Naumen Public License',
      'NBPL-1.0': 'Net Boolean Public License v1',
      'NetCDF': 'NetCDF license',
      'NGPL': 'Nethack General Public License',
      'NOSL': 'Netizen Open Source License',
      'NPL-1.0': 'Netscape Public License v1.0',
      'NPL-1.1': 'Netscape Public License v1.1',
      'Newsletr': 'Newsletr License',
      'NLPL': 'No Limit Public License',
      'Nokia': 'Nokia Open Source License',
      'NPOSL-3.0': 'Non-Profit Open Software License 3.0',
      'Noweb': 'Noweb License',
      'NRL': 'NRL License',
      'NTP': 'NTP License',
      'Nunit': 'Nunit License',
      'OCLC-2.0': 'OCLC Research Public License 2.0',
      'ODbL-1.0': 'ODC Open Database License v1.0',
      'PDDL-1.0': 'ODC Public Domain Dedication & License 1.0',
      'OGTSL': 'Open Group Test Suite License',
      'OLDAP-2.2.2': 'Open LDAP Public License  2.2.2',
      'OLDAP-1.1': 'Open LDAP Public License v1.1',
      'OLDAP-1.2': 'Open LDAP Public License v1.2',
      'OLDAP-1.3': 'Open LDAP Public License v1.3',
      'OLDAP-1.4': 'Open LDAP Public License v1.4',
      'OLDAP-2.0': 'Open LDAP Public License v2.0 (or possibly 2.0A and 2.0B)',
      'OLDAP-2.0.1': 'Open LDAP Public License v2.0.1',
      'OLDAP-2.1': 'Open LDAP Public License v2.1',
      'OLDAP-2.2': 'Open LDAP Public License v2.2',
      'OLDAP-2.2.1': 'Open LDAP Public License v2.2.1',
      'OLDAP-2.3': 'Open LDAP Public License v2.3',
      'OLDAP-2.4': 'Open LDAP Public License v2.4',
      'OLDAP-2.5': 'Open LDAP Public License v2.5',
      'OLDAP-2.6': 'Open LDAP Public License v2.6',
      'OLDAP-2.7': 'Open LDAP Public License v2.7',
      'OLDAP-2.8': 'Open LDAP Public License v2.8',
      'OML': 'Open Market License',
      'OPL-1.0': 'Open Public License v1.0',
      'OSL-1.0': 'Open Software License 1.0',
      'OSL-1.1': 'Open Software License 1.1',
      'OSL-2.0': 'Open Software License 2.0',
      'OSL-2.1': 'Open Software License 2.1',
      'OSL-3.0': 'Open Software License 3.0',
      'OpenSSL': 'OpenSSL License',
      'PHP-3.0': 'PHP License v3.0',
      'PHP-3.01': 'PHP License v3.01',
      'Plexus': 'Plexus Classworlds License',
      'PostgreSQL': 'PostgreSQL License',
      'psfrag': 'psfrag License',
      'psutils': 'psutils License',
      'Python-2.0': 'Python License 2.0',
      'QPL-1.0': 'Q Public License 1.0',
      'Qhull': 'Qhull License',
      'Rdisc': 'Rdisc License',
      'RPSL-1.0': 'RealNetworks Public Source License v1.0',
      'RPL-1.1': 'Reciprocal Public License 1.1',
      'RPL-1.5': 'Reciprocal Public License 1.5',
      'RHeCos-1.1': 'Red Hat eCos Public License v1.1',
      'RSCPL': 'Ricoh Source Code Public License',
      'RSA-MD': 'RSA Message-Digest License ',
      'Ruby': 'Ruby License',
      'SAX-PD': 'Sax Public Domain Notice',
      'Saxpath': 'Saxpath License',
      'SCEA': 'SCEA Shared Source License',
      'SWL': 'Scheme Widget Library (SWL) Software License Agreement',
      'Sendmail': 'Sendmail License',
      'SGI-B-1.0': 'SGI Free Software License B v1.0',
      'SGI-B-1.1': 'SGI Free Software License B v1.1',
      'SGI-B-2.0': 'SGI Free Software License B v2.0',
      'OFL-1.0': 'SIL Open Font License 1.0',
      'OFL-1.1': 'SIL Open Font License 1.1',
      'SimPL-2.0': 'Simple Public License 2.0',
      'Sleepycat': 'Sleepycat License',
      'SNIA': 'SNIA Public License 1.1',
      'Spencer-86': 'Spencer License 86',
      'Spencer-94': 'Spencer License 94',
      'Spencer-99': 'Spencer License 99',
      'SMLNJ': 'Standard ML of New Jersey License',
      'SugarCRM-1.1.3': 'SugarCRM Public License v1.1.3',
      'SISSL': 'Sun Industry Standards Source License v1.1',
      'SISSL-1.2': 'Sun Industry Standards Source License v1.2',
      'SPL-1.0': 'Sun Public License v1.0',
      'Watcom-1.0': 'Sybase Open Watcom Public License 1.0',
      'TCL': 'TCL/TK License',
      'Unlicense': 'The Unlicense',
      'TMate': 'TMate Open Source License',
      'TORQUE-1.1': 'TORQUE v2.5+ Software License v1.1',
      'TOSL': 'Trusster Open Source License',
      'Unicode-TOU': 'Unicode Terms of Use',
      'UPL-1.0': 'Universal Permissive License v1.0',
      'NCSA': 'University of Illinois/NCSA Open Source License',
      'Vim': 'Vim License',
      'VOSTROM': 'VOSTROM Public License for Open Source',
      'VSL-1.0': 'Vovida Software License v1.0',
      'W3C-19980720': 'W3C Software Notice and License (1998-07-20)',
      'W3C': 'W3C Software Notice and License (2002-12-31)',
      'Wsuipa': 'Wsuipa License',
      'Xnet': 'X.Net License',
      'X11': 'X11 License',
      'Xerox': 'Xerox License',
      'XFree86-1.1': 'XFree86 License 1.1',
      'xinetd': 'xinetd License',
      'xpp': 'XPP License',
      'XSkat': 'XSkat License',
      'YPL-1.0': 'Yahoo! Public License v1.0',
      'YPL-1.1': 'Yahoo! Public License v1.1',
      'Zed': 'Zed License',
      'Zend-2.0': 'Zend License v2.0',
      'Zimbra-1.3': 'Zimbra Public License v1.3',
      'Zimbra-1.4': 'Zimbra Public License v1.4',
      'Zlib': 'zlib License',
      'zlib-acknowledgement': 'zlib/libpng License with Acknowledgement',
      'ZPL-1.1': 'Zope Public License 1.1',
      'ZPL-2.0': 'Zope Public License 2.0',
      'ZPL-2.1': 'Zope Public License 2.1',
      'eCos-2.0': 'eCos license version 2.0',
      'GPL-1.0+': 'GNU General Public License v1.0 or later',
      'GPL-2.0+': 'GNU General Public License v2.0 or later',
      'GPL-2.0-with-autoconf-exception': 'GNU General Public License v2.0 w/Autoconf exception',
      'GPL-2.0-with-bison-exception': 'GNU General Public License v2.0 w/Bison exception',
      'GPL-2.0-with-classpath-exception': 'GNU General Public License v2.0 w/Classpath exception',
      'GPL-2.0-with-font-exception': 'GNU General Public License v2.0 w/Font exception',
      'GPL-2.0-with-GCC-exception': 'GNU General Public License v2.0 w/GCC Runtime Library exception',
      'GPL-3.0+': 'GNU General Public License v3.0 or later',
      'GPL-3.0-with-autoconf-exception': 'GNU General Public License v3.0 w/Autoconf exception',
      'GPL-3.0-with-GCC-exception': 'GNU General Public License v3.0 w/GCC Runtime Library exception',
      'LGPL-2.1+': 'GNU Lesser General Public License v2.1 or later',
      'LGPL-3.0+': 'GNU Lesser General Public License v3.0 or later',
      'LGPL-2.0+': 'GNU Library General Public License v2 or later',
      'StandardML-NJ': 'Standard ML of New Jersey License',
      'WXwindows': 'wxWindows Library License'
    },
  },
  state: {},
  user: {},
  initState: function() {
    $('a').each(function() {
      if ($(this).data('state')) {
        return;
      }
      
      $(this).data('state', true);
      
      if (navigator.userAgent.match(/mobile/i)) {
        $(this).bind({
          touchstart: function() {
            $(window).removeData('scrolled');
          },
          touchend: function(e) {
            if ($(window).data('scrolled')) {
              return false;
            }
            return autocode.initStateCallback(e, $(this));
          }
        });
      } else {
        $(this).click(autocode.initStateCallback);
      }
    });
  },
  initStateCallback: function(e, o) {
    var o = o || $(this);
    var href = o.attr('href');
    if (!href) {
      return false;
    } else if (href.match(/^https?:/)) {
      // open new window
      window.open(href, '_blank');
      
      // close popover
      autocode.popover.close();
      
      return false;
    }
    
    e.preventDefault();
    
    // get query
    var query = href.split('?');
    href = query[0];
    query = autocode.query.search(query[1]);
    
    autocode.ga.send('pageview', href);
    
    console.log(href);
    
    // get name
    var name = href.split('/').splice(0, 2).join('/');
    
    // get state name
    var state_name = href;
    if (name == autocode.repo) {
      state_name = state_name.split('/').splice(2).join('/');
    }
    var state = autocode.state[state_name];
    if (state) {
      $('input:focus').blur();
      state(query);
      autocode.initState();
    } else if (!state) {
      autocode.action.loadProject({ force: true, name: name });
    }
    
    history.pushState(null, null, href);
    
    if (autocode.listener.listeners[state_name]) {
      for (var listener_name in autocode.listener.listeners[state_name]) {
        autocode.listener.listeners[state_name][listener_name](query);
      }
    }
    
    autocode.resize.all();
    
    return false;
  }
};

$(window).load(autocode.init);
$(window).resize(autocode.resize);