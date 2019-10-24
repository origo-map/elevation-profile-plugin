# layermanager
Elevation profile plugin for Origo.

#### Example usage of Elevation profile as plugin
index.html:
origo.on('load', function(viewer) {
  var ep = ElevationProfile(viewer);
  viewer.addComponent(ep);
});

config.json:
"attributes": [
  {
    "showProfile": true
  }
]