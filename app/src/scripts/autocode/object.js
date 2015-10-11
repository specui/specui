autocode.object = {
  clone: function(o) {
    return JSON.parse(JSON.stringify(o));
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