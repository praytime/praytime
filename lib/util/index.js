exports.setIqamaTimes = (p, a) => {
  p.fajrIqama    = a[0]
  p.zuhrIqama    = a[1]
  p.asrIqama     = a[2]
  p.maghribIqama = a[3]
  p.ishaIqama    = a[4]
}
