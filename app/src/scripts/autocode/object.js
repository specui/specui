autocode.object = {
  clone: function(o) {
    return JSON.parse(JSON.stringify(o));
  },
  first: function(o) {
    for (var i in o) {
      return o[i];
    }
  },
  firstKey: function(o) {
    for (var i in o) {
      return i;
    }
  },
  last: function(o) {
    var v;
    for (var i in o) {
      v = o[i];
    }
    return v;
  },
  lastKey: function(o) {
    var k;
    for (var i in o) {
      k = i;
    }
    return k;
  },
  sort: function(o) {
    var sorted = {}, key, a = [];

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }
    a.sort();

    for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
    }
    
    return sorted;
  }
};