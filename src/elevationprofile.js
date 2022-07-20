import ol_control_Profil from 'ol-ext/control/Profile';

const VectorLayer = Origo.ol.layer.Vector;
const VectorSource = Origo.ol.source.Vector;
const Style = Origo.ol.style.Style;
const Circle = Origo.ol.style.Circle;
const Fill = Origo.ol.style.Fill;
const Stroke = Origo.ol.style.Stroke;
const Feature = Origo.ol.Feature;
const Point = Origo.ol.geom.Point;

const ElevationProfile = function ElevationProfile(viewer) {
  let map;
  let pt;
  let vectorSource;
  let vectorLayer;
  let style;

  const showProfile = function showProfile(feature, attribute, attributes) {
    function drawPoint(e) {
      if (!pt) return;
      if (e.type === 'over') {
        pt.setGeometry(new Point(e.coord));
        pt.setStyle(null);
      } else {
        pt.setStyle([]);
      }
    }
    if (attribute.showProfile && (feature.getGeometry().getType() === 'LineString' || feature.getGeometry().getType() === 'MultiLineString') && (feature.getGeometry().getLayout() === 'XYZ' || feature.getGeometry().getLayout() === 'XYZM')) {
      const profileList = document.createElement('li');
      const profile = new ol_control_Profil({
        target: profileList,
        width: 240,
        info: {
          zmin: 'Min höjd',
          zmax: 'Max höjd',
          ytitle: 'Höjd (m)',
          xtitle: 'Distans (km)',
          time: 'Tid',
          altitude: 'Höjd',
          distance: 'Distans',
          altitudeUnits: 'm',
          distanceUnitsM: 'm',
          distanceUnitsKM: 'km'
        }
      });
      map.addControl(profile);
      profile.setGeometry(feature.getGeometry());
      profile.on(['over', 'out'], drawPoint);
      return profileList;
    }
    return false;
  };

  return Origo.ui.Component({
    name: 'elevationProfile',
    onAdd() {
    },
    onInit() {
      map = viewer.getMap();
      style = [
        new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({
              color: [0, 153, 255]
            }),
            stroke: new Stroke({
              color: [255, 255, 255],
              width: 2
            })
          }),
          zIndex: Infinity
        })
      ];
      pt = new Feature(new Point([0, 0]));
      vectorSource = new VectorSource();
      vectorLayer = new VectorLayer({
        group: 'none',
        source: vectorSource,
        style,
        name: 'elevationProfile',
        visible: true
      });
      pt.setStyle([]);
      map.addLayer(vectorLayer);
      vectorSource.addFeature(pt);
      viewer.getControlByName('featureInfo').addAttributeType('showProfile', showProfile);
    },
    onShowElevationProfile(feature) {
      const attribute = { showProfile: true };
      const attributes = {};
      const profileList = showProfile(feature, attribute, attributes);
      const featureInfo = viewer.getControlByName('featureInfo');
      const obj = {};
      obj.feature = feature;
      obj.title = 'Markhöjd profil';
      obj.content = profileList;
      const extent = feature.getGeometry().getExtent();
      const center = (extent[0] + extent[2])/2;
      featureInfo.render([obj], 'overlay', [center,extent[3]], { ignorePan: true });
    },
    onRender() {
    },
    render() {
    }
  });
};

if (window.Origo) {
  Origo.controls.ElevationProfile = ElevationProfile;
}

export default ElevationProfile;
