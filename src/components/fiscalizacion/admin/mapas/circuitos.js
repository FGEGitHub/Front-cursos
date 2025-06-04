      import Tooltip from '@mui/material/Tooltip';  
export default function RecorridosSVG({ handleOpenDialog, lotes }) {
  return (

<svg  version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3507 2480" baseProfile="tiny" width="296.926mm" height="209.973mm">
 <defs/>
 <g stroke-width="1" stroke-linecap="square" fill="none" stroke="black" fill-rule="evenodd" stroke-linejoin="bevel">
  <g stroke-width="1" stroke-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g fill-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" font-weight="400" font-family="MS Shell Dlg 2" fill="#ffffff" stroke="none" font-size="32.5" font-style="normal">

        {[0].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(0)}  vector-effect="none" d="M-2,-2 L3510,-2 L3510,2483 L-2,2483 L-2,-2" fill-rule="evenodd"/></Tooltip>)})}
  </g>

          
          {[1].map(() => (
            <Tooltip title={'Sin datos'}>
            </Tooltip>
          ))}
        
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g fill-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" font-weight="400" font-family="MS Shell Dlg 2" fill="#ffffff" stroke="none" font-size="32.5" font-style="normal">

        {[1].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(1)}  vector-effect="none" d="M0,0 L297,0 L297,210 L0,210 L0,0" fill-rule="evenodd"/></Tooltip>)})}
  </g>

          
          {[2].map(() => (
            <Tooltip title={'Sin datos'}>
            </Tooltip>
          ))}
        
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g fill-opacity="0" transform="matrix(0.999751,0,0,0.999751,0,0)" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="none" font-size="32.5" font-style="normal">
   <rect x="0" y="0" width="3508" height="2480"/>
  </g>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[2].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(2)}  vector-effect="none" d="M619.997,1088.98 L649.345,1092.64 L742.156,1104.16 L754.024,1105.64 L763.755,1028.49 L624.327,1015.46 L623.295,1032.98 L622.227,1051.14 L622.227,1051.17 L622.217,1051.31 L622.208,1051.53 L622.199,1051.56 L619.997,1088.98" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[3].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(3)}  vector-effect="none" d="M627.479,962.136 L628.262,959.409 L607.852,953.567 L595.485,959.952 L579.148,964.965 L577.13,972.918 L571.923,976.198 L566.21,977.626 L560.967,982.252 L530.264,995.604 L527.675,999.889 L516.691,1001.99 L511.54,1006.28 L503.661,1009.33 L480.744,1036.46 L475.39,1050.36 L469.152,1058.01 L466.028,1069.52 L472.635,1070.56 L580.926,1084.09 L580.945,1084.1 L619.997,1088.98 L621.904,1051.54 L622.208,1051.53 L622.217,1051.29 L622.227,1051.21 L622.227,1051.17 L622.227,1051.14 L624.327,1015.46 L627.479,962.136" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[4].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(4)}  vector-effect="none" d="M636.915,1181.52 L608.045,1178.88 L580.318,1175.54 L549.163,1170.9 L523.178,1154.97 L521.326,1153.83 L518.358,1147.86 L513.788,1141.6 L509.586,1138.92 L500.537,1139.32 L492.631,1142.13 L482.744,1143.62 L480.974,1145.58 L462.315,1148.77 L462.858,1171.65 L462.812,1187.24 L464.637,1206.62 L481.398,1234.85 L483.739,1245.25 L485.785,1256.66 L485.665,1264.63 L488.328,1276.75 L499.837,1288.35 L536.991,1314.05 L544.795,1321.6 L567.353,1340.09 L579.36,1361.46 L586.593,1372.19 L595.043,1383.27 L611.335,1400.76 L622.743,1417.29 L635.486,1444.73 L651.492,1473.46 L672.889,1470.05 L694.451,1466.93 L652.451,1366.77 L651.64,1357.26 L653.612,1341.39 L648.839,1327.17 L648.405,1319.88 L633.929,1316.75 L634.132,1226.59 L633.708,1190.16 L636.915,1181.52" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[5].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(5)}  vector-effect="none" d="M649.345,1092.64 L619.997,1088.98 L580.945,1084.1 L580.926,1084.09 L472.635,1070.56 L466.028,1069.52 L463.918,1078.31 L462.084,1107.3 L459.725,1131.08 L462.278,1148.73 L481.131,1145.5 L482.744,1143.62 L492.631,1142.13 L500.537,1139.32 L509.586,1138.92 L513.788,1141.6 L518.358,1147.86 L521.326,1153.83 L523.178,1154.97 L549.163,1170.9 L580.318,1175.54 L608.045,1178.88 L636.915,1181.52 L649.345,1092.64" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[6].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(6)}  vector-effect="none" d="M1073.35,836.015 L1083.12,847.589 L1112.1,886.714 L1131.11,911.889 L1123.93,960.211 L1108.86,961.252 L1077.52,1009.95 L1106.05,1002.08 L1098.35,1050.92 L1090.54,1101.11 L1174.11,1124.05 L1329.73,1150.54 L1370.04,1159.31 L1402.92,1162.47 L1481.66,1173.01 L1521.13,1169.49 L1555.51,1170.17 L1596.34,1175.11 L1640.63,1185.63 L1706.37,1218.08 L1859.7,1242.46 L1900.84,943.541 L1817.8,625.579 L1659.62,381.942 L1577.36,315.237 L1556.01,328.58 L1541.77,363.688 L1513.74,402.86 L1503.91,413.641 L1490.29,430.439 L1468.68,441.515 L1461.7,452.628 L1440.35,468.772 L1429.42,471.224 L1415.69,478.42 L1406.41,483.94 L1400.99,494.988 L1393.83,503.263 L1400.86,532.925 L1396.34,546.379 L1392.29,558.883 L1383.35,564.983 L1370.97,565.822 L1345.99,620.419 L1335.06,642.082 L1324.27,658.568 L1308.45,670.501 L1281.56,676.122 L1262.58,675.421 L1248.35,665.589 L1240.43,651.546 L1230.94,647.335 L1216.7,649.445 L1205.22,657.738 L1201.9,669.542 L1177.11,691.556 L1170.04,710.52 L1149.48,737.888 L1131.7,751.359 L1113.87,753.101 L1110.29,754.575 L1096.49,787.03 L1092.77,804.104 L1073.35,836.015" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[7].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(7)}  vector-effect="none" d="M814.436,1229.33 L809.128,1232.71 L802.65,1234.69 L780.94,1339.6 L779.328,1361.22 L779.365,1383.05 L781.272,1400.08 L783.603,1417.43 L793.187,1416.64 L797.029,1416.61 L804.18,1419.74 L803.461,1435.04 L801.858,1440.43 L797.121,1447.24 L796.228,1456.51 L799.416,1476.92 L928.504,1451.76 L932.356,1455.04 L976.531,1441 L964.423,1428.47 L972.542,1413.3 L1001.52,1417.9 L1002.4,1407.17 L1007.91,1329.16 L1020.56,1330.22 L1031.64,1318.95 L1034.08,1309.92 L1028.18,1302.6 L990.768,1287.89 L981.378,1282.27 L929.214,1255.84 L826.36,1244.38 L833.059,1213.91 L820.388,1225.87 L814.436,1229.33" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[8].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(8)}  vector-effect="none" d="M627.479,962.136 L624.327,1015.46 L763.755,1028.49 L766.971,997.954 L764.105,996.222 L755.48,995.595 L719.663,993.752 L722.289,965.73 L717,960.727 L713.682,958.976 L707.527,958.644 L704.799,954.921 L701.233,950.047 L695.99,943.965 L687.54,942.104 L687.485,943.799 L678.344,946.287 L673.359,947.467 L664.126,951.936 L641.642,955.76 L636.196,959.731 L628.262,959.409 L627.479,962.136" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[9].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(9)}  vector-effect="none" d="M649.345,1092.64 L636.915,1181.52 L668.282,1185.17 L706.043,1173.38 L708.725,1172.52 L712.411,1171.41 L748.062,1160.7 L794.163,1220.76 L802.65,1234.69 L809.128,1232.71 L820.388,1225.87 L833.059,1213.91 L849.415,1117.74 L754.024,1105.64 L744.284,1104.42 L742.156,1104.16 L649.345,1092.64" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[10].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(10)}  vector-effect="none" d="M972.523,1077.85 L999.679,1085.55 L1044.33,1094.4 L1045.31,1094.54 L1045.37,1094.55 L1065.21,1097.39 L1090.54,1101.11 L1098.35,1050.92 L1106.05,1002.08 L1077.52,1009.95 L1108.86,961.252 L1123.93,960.211 L1131.11,911.889 L1121.56,900.352 L1112.1,886.714 L1083.12,847.589 L1073.35,836.015 L1056.62,852.251 L1043.13,863.963 L1025.11,888.594 L1003.74,904.185 L976.587,920.385 L975.029,927.194 L979.084,932.981 L978.54,939.616 L980.015,961.851 L988.483,1031.61 L982.272,1032.35 L982.245,1047.83 L972.523,1077.85" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[11].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(11)}  vector-effect="none" d="M1016.12,1151.01 L1020.9,1118.63 L1025.15,1090.28 L1019.44,1089.47 L999.679,1085.55 L972.523,1077.85 L919.751,1062.98 L866.84,1050.67 L859.45,1048.38 L855.238,1047.8 L815.127,1044.11 L812.362,1036.33 L780.636,1009.16 L766.971,997.954 L763.755,1028.49 L754.024,1105.64 L849.415,1117.74 L936.687,1127.83 L1016.12,1151.01" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[12].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(12)}  vector-effect="none" d="M1025.15,1090.28 L1020.9,1118.63 L1016.15,1151.02 L1034.4,1155.94 L1041.76,1157.92 L1039.61,1164.92 L1037.75,1186.97 L1038.27,1188.69 L1040.37,1190.24 L1055.58,1193.04 L1053.93,1210.88 L1052.23,1229.13 L1077.93,1236.05 L1077.14,1247.11 L1077.14,1247.15 L1077.13,1247.3 L1076.42,1257.26 L1076.36,1258.06 L1075.51,1270.06 L1075.49,1270.26 L1075.37,1271.93 L1074,1291.17 L1103.33,1295.8 L1124.12,1299.08 L1124.33,1299.11 L1124.34,1299.12 L1157.66,1304.37 L1178.56,1347.27 L1178.57,1347.28 L1178.57,1347.29 L1178.72,1347.59 L1178.91,1348.06 L1178.96,1348.15 L1179.31,1348.99 L1199.43,1396.94 L1219.53,1382.14 L1232.91,1374.7 L1312.43,1561.66 L1339.29,1604.93 L1390.63,1665.78 L1390.73,1665.9 L1403.36,1680.85 L1421.84,1723.2 L1431.74,1767.06 L1432.82,1771.84 L1665.15,1720.13 L1835.98,1552.51 L1859.7,1242.46 L1706.37,1218.08 L1640.63,1185.63 L1596.34,1175.11 L1555.51,1170.17 L1521.13,1169.49 L1481.66,1173.01 L1402.92,1162.47 L1370.04,1159.31 L1329.73,1150.54 L1174.11,1124.05 L1090.54,1101.11 L1068.8,1097.91 L1045.37,1094.55 L1045.31,1094.54 L1025.15,1090.28" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[13].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(13)}  vector-effect="none" d="M636.915,1181.52 L633.708,1190.16 L634.132,1226.59 L633.929,1316.75 L648.405,1319.88 L648.839,1327.17 L653.612,1341.39 L651.64,1357.26 L652.451,1366.77 L694.451,1466.93 L796.228,1456.51 L797.121,1447.24 L801.858,1440.43 L803.461,1435.04 L804.18,1419.74 L797.029,1416.61 L792.781,1416.68 L783.603,1417.43 L781.272,1400.08 L779.365,1383.05 L779.328,1361.22 L780.94,1339.6 L802.65,1234.69 L794.163,1220.76 L748.062,1160.7 L712.411,1171.41 L708.771,1172.51 L705.979,1173.37 L668.282,1185.17 L636.915,1181.52" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[14].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(14)}  vector-effect="none" d="M849.415,1117.74 L833.059,1213.91 L830.414,1225.42 L828.405,1233.71 L826.36,1244.38 L929.214,1255.84 L981.378,1282.27 L990.768,1287.89 L1028.18,1302.6 L1034.08,1309.92 L1031.64,1318.95 L1020.56,1330.22 L1007.91,1329.16 L1003.02,1395.75 L1002.4,1407.17 L1001.52,1417.9 L1021.87,1420.03 L1035.4,1421.09 L1094.34,1471.11 L1095.49,1466.59 L1097.87,1459.05 L1099.45,1450.11 L1103.18,1436.45 L1115.86,1426.78 L1125.55,1420.99 L1137.01,1418.54 L1146.11,1411.88 L1174.75,1414.86 L1184.41,1411.54 L1199.43,1396.94 L1179.31,1348.99 L1178.96,1348.15 L1178.91,1348.06 L1178.72,1347.6 L1178.57,1347.29 L1178.57,1347.28 L1178.56,1347.27 L1172.58,1334.93 L1158.36,1304.48 L1124.34,1299.12 L1124.33,1299.11 L1124.12,1299.08 L1103.33,1295.8 L1074,1291.17 L1075.49,1270.26 L1075.51,1270.06 L1075.77,1266.29 L1076.36,1258.06 L1076.66,1253.84 L1076.72,1253.04 L1077.14,1247.15 L1077.14,1247.11 L1077.15,1246.99 L1077.15,1246.96 L1077.93,1236.05 L1052.23,1229.13 L1053.93,1210.66 L1055.58,1193.04 L1040.37,1190.24 L1038.27,1188.69 L1037.75,1186.97 L1039.61,1164.92 L1041.76,1157.92 L1034.4,1155.94 L936.687,1127.83 L890.651,1122.51 L849.415,1117.74" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[15].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(15)}  vector-effect="none" d="M1232.91,1374.7 L1219.53,1382.14 L1199.43,1396.94 L1184.41,1411.54 L1174.75,1414.86 L1146.11,1411.88 L1137.01,1418.54 L1125.55,1420.99 L1115.86,1426.78 L1103.18,1436.45 L1099.45,1450.11 L1097.87,1459.05 L1095.49,1466.59 L1094.34,1471.11 L1035.4,1421.09 L1021.87,1420.03 L972.542,1413.3 L964.423,1428.47 L976.531,1441 L932.356,1455.04 L928.504,1451.76 L799.416,1476.92 L796.228,1456.51 L694.451,1466.93 L651.492,1473.46 L682.638,1499.56 L702.413,1521.3 L698.46,1541.64 L697.474,1567.24 L706.366,1592.84 L700.837,1640.53 L686.6,1675.59 L677.109,1726.79 L682.638,1761.85 L693.714,1799.01 L714.281,1822.85 L748.284,1845.99 L787.833,1830.57 L849.525,1844.24 L859.809,1849.5 L918.331,1827.06 L942.852,1818.65 L970.533,1819 L986.741,1821.45 L995.053,1808.13 L1014.82,1804.63 L1017.2,1789.2 L1040.13,1769.56 L1063.86,1766.76 L1093.12,1766.76 L1121.59,1771.67 L1158.77,1761.15 L1180.91,1766.76 L1198.71,1765.53 L1207.8,1756.42 L1234.89,1753.61 L1253.48,1758.69 L1262.68,1756.42 L1265.34,1750.98 L1285.91,1743.09 L1290.05,1741.52 L1328.02,1736.78 L1387.34,1762.55 L1432.82,1771.84 L1431.88,1767.68 L1431.74,1767.06 L1421.84,1723.2 L1403.36,1680.85 L1393.26,1668.89 L1390.73,1665.9 L1390.63,1665.78 L1339.29,1604.93 L1312.43,1561.66 L1232.91,1374.7" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[16].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(16)}  vector-effect="none" d="M764.105,996.222 L766.971,997.954 L771.081,1001.34 L780.636,1009.16 L814.869,1011.18 L816.168,1011.55 L816.122,1012.33 L837.251,1015.84 L856.446,1018.09 L866.139,1017.35 L871.521,980.99 L872.304,975.046 L872.663,969.222 L875.861,950.056 L877.612,942.712 L876.147,936.658 L867.936,935.303 L850.677,930.097 L841.112,923.158 L839.38,923.14 L839.831,919.979 L840.32,917.021 L828.368,918.625 L822.683,915.943 L815.91,913.575 L810.87,913.953 L804.198,913.391 L798.734,911.354 L796.338,908.617 L793.813,909.889 L791.371,912.718 L787.833,910.11 L778.296,910.635 L778.268,912.432 L775.329,913.317 L763.985,919.435 L754.457,921.656 L744.533,925.637 L739.041,927.784 L729.504,927.397 L715.175,927.379 L715.037,930.198 L706.587,931.092 L701.906,934.935 L695.686,939.634 L695.99,943.965 L701.233,950.047 L701.243,950.056 L704.799,954.921 L707.527,958.644 L713.682,958.976 L717,960.727 L722.289,965.73 L719.663,993.752 L755.48,995.595 L764.105,996.222" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0.0705882" stroke-width="6.87812" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" stroke-miterlimit="2" font-family="MS Shell Dlg 2" fill="#e65100" stroke="#e65100" font-size="32.5" stroke-linejoin="miter" font-style="normal">

        {[17].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(17)}  vector-effect="none" d="M875.861,950.056 L866.139,1017.35 L856.446,1018.09 L837.251,1015.84 L816.122,1012.33 L816.168,1011.55 L814.869,1011.18 L780.636,1009.16 L812.362,1036.33 L815.127,1044.11 L855.238,1047.8 L859.45,1048.38 L859.45,1048.39 L859.45,1048.43 L866.84,1050.67 L919.751,1062.98 L972.523,1077.85 L982.245,1047.83 L982.281,1040.2 L982.272,1032.35 L988.483,1031.61 L982.521,984.98 L980.015,961.851 L978.54,939.616 L979.084,932.981 L975.029,927.194 L976.587,920.385 L969.547,923.683 L962.341,927.95 L953.651,929.968 L949.735,936.796 L944.298,936.842 L936.355,940.473 L931.214,942.97 L912.462,947.771 L895.055,947.024 L877.612,942.712 L875.861,950.056" fill-rule="evenodd"/></Tooltip>)})}
  </g>

          
          {[18].map(() => (
            <Tooltip title={'Sin datos'}>
            </Tooltip>
          ))}
        
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
 </g>

</svg>

      );
}