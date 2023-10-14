# elevation-profile-plugin
Elevation profile plugin for Origo. Shows profiles for linestrings that has z-dimension. 

#### Example usage of Elevation profile as plugin
Add .css and .js-files (after origo.js) and then config:

index.html:

```javascript
<link href="plugin/elevation-profile.css" rel="stylesheet">
<script src="plugin/elevation-profile.min.js"></script>
```
```javascript
var origo = Origo('index.json');
origo.on('load', function(viewer) {
  var ep = ElevationProfile(viewer, {
      width: 240,
      height: 150,
      zoomable: false,
      selectable: false,
	});
  viewer.addComponent(ep);
});
```

index.json:
```json
"layers": [
 {
  "name": "profile-layer",
  "attributes": [
   {
    "showProfile": true
   }
  ]
 }
]
```
