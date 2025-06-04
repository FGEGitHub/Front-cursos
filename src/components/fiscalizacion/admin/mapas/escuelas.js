        import Tooltip from '@mui/material/Tooltip';
export default function RecorridosSVG({ handleOpenDialog, lotes }) {
  return (

<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3507 2480" baseProfile="tiny" width="296.926mm" height="209.973mm">
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

        
        
  <g stroke-width="1" stroke-opacity="1" transform="matrix(11.8081,0,0,11.8081,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g fill-opacity="0" transform="matrix(0.999751,0,0,0.999751,0,0)" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="none" font-size="32.5" font-style="normal">
   <rect x="0" y="0" width="3508" height="2480"/>
  </g>
  <g stroke-width="1" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="none" stroke="#000000" font-size="32.5" stroke-linejoin="bevel" font-style="normal"/>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[2].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(2)}  vector-effect="none" d="M1231.93,1237.55 L1255.55,1237.55 L1255.55,1261.17 L1231.93,1261.17 L1231.93,1237.55" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[3].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(3)}  vector-effect="none" d="M636.631,1039.38 L660.253,1039.38 L660.253,1063 L636.631,1063 L636.631,1039.38" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[4].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(4)}  vector-effect="none" d="M687.69,1022.09 L711.312,1022.09 L711.312,1045.71 L687.69,1045.71 L687.69,1022.09" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[5].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(5)}  vector-effect="none" d="M570.304,1210.3 L593.926,1210.3 L593.926,1233.92 L570.304,1233.92 L570.304,1210.3" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[6].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(6)}  vector-effect="none" d="M540.439,1089.31 L564.061,1089.31 L564.061,1112.93 L540.439,1112.93 L540.439,1089.31" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[7].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(7)}  vector-effect="none" d="M551.414,1155.67 L575.036,1155.67 L575.036,1179.3 L551.414,1179.3 L551.414,1155.67" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[8].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(8)}  vector-effect="none" d="M551.515,1154.74 L575.137,1154.74 L575.137,1178.37 L551.515,1178.37 L551.515,1154.74" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[9].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(9)}  vector-effect="none" d="M1091.61,1075.76 L1115.23,1075.76 L1115.23,1099.39 L1091.61,1099.39 L1091.61,1075.76" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[10].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(10)}  vector-effect="none" d="M1077.34,1016.86 L1100.96,1016.86 L1100.96,1040.49 L1077.34,1040.49 L1077.34,1016.86" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[11].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(11)}  vector-effect="none" d="M1040.88,1055.08 L1064.5,1055.08 L1064.5,1078.7 L1040.88,1078.7 L1040.88,1055.08" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[12].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(12)}  vector-effect="none" d="M1077.41,1016.38 L1101.03,1016.38 L1101.03,1040 L1077.41,1040 L1077.41,1016.38" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[13].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(13)}  vector-effect="none" d="M1285.95,916.443 L1309.58,916.443 L1309.58,940.065 L1285.95,940.065 L1285.95,916.443" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[14].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(14)}  vector-effect="none" d="M981.436,1150.36 L1005.06,1150.36 L1005.06,1173.98 L981.436,1173.98 L981.436,1150.36" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[15].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(15)}  vector-effect="none" d="M905.885,1263.17 L929.507,1263.17 L929.507,1286.8 L905.885,1286.8 L905.885,1263.17" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[16].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(16)}  vector-effect="none" d="M766.153,935.462 L789.775,935.462 L789.775,959.084 L766.153,959.084 L766.153,935.462" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[17].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(17)}  vector-effect="none" d="M755.962,951.007 L779.584,951.007 L779.584,974.629 L755.962,974.629 L755.962,951.007" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[18].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(18)}  vector-effect="none" d="M995.479,1012.26 L1019.1,1012.26 L1019.1,1035.88 L995.479,1035.88 L995.479,1012.26" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[19].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(19)}  vector-effect="none" d="M993.397,1009.78 L1017.02,1009.78 L1017.02,1033.4 L993.397,1033.4 L993.397,1009.78" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[20].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(20)}  vector-effect="none" d="M1130.62,928.044 L1154.24,928.044 L1154.24,951.666 L1130.62,951.666 L1130.62,928.044" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[21].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(21)}  vector-effect="none" d="M1107.05,932.937 L1130.67,932.937 L1130.67,956.559 L1107.05,956.559 L1107.05,932.937" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[22].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(22)}  vector-effect="none" d="M701.411,1136.63 L725.033,1136.63 L725.033,1160.25 L701.411,1160.25 L701.411,1136.63" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[23].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(23)}  vector-effect="none" d="M706.681,1136.21 L730.303,1136.21 L730.303,1159.84 L706.681,1159.84 L706.681,1136.21" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[24].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(24)}  vector-effect="none" d="M712.164,1154.13 L735.786,1154.13 L735.786,1177.75 L712.164,1177.75 L712.164,1154.13" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[25].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(25)}  vector-effect="none" d="M726.972,1149.61 L750.594,1149.61 L750.594,1173.23 L726.972,1173.23 L726.972,1149.61" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[26].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(26)}  vector-effect="none" d="M738.795,1231.36 L762.417,1231.36 L762.417,1254.98 L738.795,1254.98 L738.795,1231.36" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[27].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(27)}  vector-effect="none" d="M682.06,1211.11 L705.682,1211.11 L705.682,1234.73 L682.06,1234.73 L682.06,1211.11" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[28].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(28)}  vector-effect="none" d="M705.456,1225.6 L729.078,1225.6 L729.078,1249.22 L705.456,1249.22 L705.456,1225.6" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[29].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(29)}  vector-effect="none" d="M737.707,1219.84 L761.329,1219.84 L761.329,1243.46 L737.707,1243.46 L737.707,1219.84" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[30].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(30)}  vector-effect="none" d="M771.396,1069.39 L795.018,1069.39 L795.018,1093.01 L771.396,1093.01 L771.396,1069.39" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[31].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(31)}  vector-effect="none" d="M786.49,1044.85 L810.112,1044.85 L810.112,1068.47 L786.49,1068.47 L786.49,1044.85" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[32].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(32)}  vector-effect="none" d="M799.243,1064.65 L822.865,1064.65 L822.865,1088.27 L799.243,1088.27 L799.243,1064.65" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[33].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(33)}  vector-effect="none" d="M796.691,911.596 L820.313,911.596 L820.313,935.218 L796.691,935.218 L796.691,911.596" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[34].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(34)}  vector-effect="none" d="M657.65,1192.08 L681.272,1192.08 L681.272,1215.7 L657.65,1215.7 L657.65,1192.08" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[35].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(35)}  vector-effect="none" d="M725.277,1290.86 L748.899,1290.86 L748.899,1314.49 L725.277,1314.49 L725.277,1290.86" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[36].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(36)}  vector-effect="none" d="M604.039,1032.24 L627.661,1032.24 L627.661,1055.87 L604.039,1055.87 L604.039,1032.24" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[37].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(37)}  vector-effect="none" d="M1146.49,824.969 L1170.11,824.969 L1170.11,848.591 L1146.49,848.591 L1146.49,824.969" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[38].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(38)}  vector-effect="none" d="M1149.88,831.225 L1173.5,831.225 L1173.5,854.847 L1149.88,854.847 L1149.88,831.225" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[39].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(39)}  vector-effect="none" d="M517.983,1049.59 L541.605,1049.59 L541.605,1073.21 L517.983,1073.21 L517.983,1049.59" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[40].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(40)}  vector-effect="none" d="M1137.57,1348.66 L1161.19,1348.66 L1161.19,1372.28 L1137.57,1372.28 L1137.57,1348.66" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[41].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(41)}  vector-effect="none" d="M1110.17,1344.46 L1133.8,1344.46 L1133.8,1368.08 L1110.17,1368.08 L1110.17,1344.46" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[42].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(42)}  vector-effect="none" d="M899.13,986.115 L922.752,986.115 L922.752,1009.74 L899.13,1009.74 L899.13,986.115" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[43].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(43)}  vector-effect="none" d="M1111.04,1742.25 L1134.66,1742.25 L1134.66,1765.88 L1111.04,1765.88 L1111.04,1742.25" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[44].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(44)}  vector-effect="none" d="M1099.09,1723.83 L1122.71,1723.83 L1122.71,1747.46 L1099.09,1747.46 L1099.09,1723.83" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[45].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(45)}  vector-effect="none" d="M749.189,1097.61 L772.811,1097.61 L772.811,1121.24 L749.189,1121.24 L749.189,1097.61" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[46].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(46)}  vector-effect="none" d="M844.985,1163.52 L868.607,1163.52 L868.607,1187.14 L844.985,1187.14 L844.985,1163.52" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[47].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(47)}  vector-effect="none" d="M623.491,1115.1 L647.113,1115.1 L647.113,1138.72 L623.491,1138.72 L623.491,1115.1" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[48].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(48)}  vector-effect="none" d="M1101.45,1154.88 L1125.07,1154.88 L1125.07,1178.5 L1101.45,1178.5 L1101.45,1154.88" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[49].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(49)}  vector-effect="none" d="M1068.31,1513.6 L1091.93,1513.6 L1091.93,1537.22 L1068.31,1537.22 L1068.31,1513.6" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[50].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(50)}  vector-effect="none" d="M1073.06,1522.72 L1096.68,1522.72 L1096.68,1546.35 L1073.06,1546.35 L1073.06,1522.72" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[51].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(51)}  vector-effect="none" d="M898.55,1315.68 L922.172,1315.68 L922.172,1339.3 L898.55,1339.3 L898.55,1315.68" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[52].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(52)}  vector-effect="none" d="M1108.07,1214.62 L1131.7,1214.62 L1131.7,1238.24 L1108.07,1238.24 L1108.07,1214.62" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[53].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(53)}  vector-effect="none" d="M1055.78,1163.28 L1079.4,1163.28 L1079.4,1186.9 L1055.78,1186.9 L1055.78,1163.28" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[54].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(54)}  vector-effect="none" d="M1135.7,1241.7 L1159.32,1241.7 L1159.32,1265.33 L1135.7,1265.33 L1135.7,1241.7" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[55].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(55)}  vector-effect="none" d="M1104.25,1226.36 L1127.87,1226.36 L1127.87,1249.98 L1104.25,1249.98 L1104.25,1226.36" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[56].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(56)}  vector-effect="none" d="M1055.74,1163.92 L1079.37,1163.92 L1079.37,1187.54 L1055.74,1187.54 L1055.74,1163.92" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[57].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(57)}  vector-effect="none" d="M589.286,1313.29 L612.908,1313.29 L612.908,1336.91 L589.286,1336.91 L589.286,1313.29" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[58].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(58)}  vector-effect="none" d="M961.016,1240.56 L984.638,1240.56 L984.638,1264.18 L961.016,1264.18 L961.016,1240.56" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[59].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(59)}  vector-effect="none" d="M910.713,1239.63 L934.335,1239.63 L934.335,1263.25 L910.713,1263.25 L910.713,1239.63" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[60].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(60)}  vector-effect="none" d="M940.458,1205.13 L964.08,1205.13 L964.08,1228.75 L940.458,1228.75 L940.458,1205.13" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[61].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(61)}  vector-effect="none" d="M927.908,1214.26 L951.53,1214.26 L951.53,1237.88 L927.908,1237.88 L927.908,1214.26" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[62].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(62)}  vector-effect="none" d="M741.209,1379.55 L764.831,1379.55 L764.831,1403.18 L741.209,1403.18 L741.209,1379.55" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[63].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(63)}  vector-effect="none" d="M602.187,968.248 L625.809,968.248 L625.809,991.87 L602.187,991.87 L602.187,968.248" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[64].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(64)}  vector-effect="none" d="M590.254,958.812 L613.876,958.812 L613.876,982.434 L590.254,982.434 L590.254,958.812" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[65].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(65)}  vector-effect="none" d="M1007.51,1364.37 L1031.14,1364.37 L1031.14,1387.99 L1007.51,1387.99 L1007.51,1364.37" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[66].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(66)}  vector-effect="none" d="M1042.56,1380.1 L1066.18,1380.1 L1066.18,1403.72 L1042.56,1403.72 L1042.56,1380.1" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[67].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(67)}  vector-effect="none" d="M495.324,1146.62 L518.946,1146.62 L518.946,1170.24 L495.324,1170.24 L495.324,1146.62" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[68].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(68)}  vector-effect="none" d="M895.997,1045.53 L919.619,1045.53 L919.619,1069.15 L895.997,1069.15 L895.997,1045.53" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[69].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(69)}  vector-effect="none" d="M628.937,1244.04 L652.559,1244.04 L652.559,1267.67 L628.937,1267.67 L628.937,1244.04" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[70].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(70)}  vector-effect="none" d="M656.729,1272.25 L680.351,1272.25 L680.351,1295.87 L656.729,1295.87 L656.729,1272.25" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[71].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(71)}  vector-effect="none" d="M753.4,990.179 L777.022,990.179 L777.022,1013.8 L753.4,1013.8 L753.4,990.179" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[72].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(72)}  vector-effect="none" d="M670.615,979.49 L694.237,979.49 L694.237,1003.11 L670.615,1003.11 L670.615,979.49" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[73].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(73)}  vector-effect="none" d="M1710.66,1231 L1734.28,1231 L1734.28,1254.63 L1710.66,1254.63 L1710.66,1231" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[74].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(74)}  vector-effect="none" d="M806.338,979.158 L829.96,979.158 L829.96,1002.78 L806.338,1002.78 L806.338,979.158" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[75].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(75)}  vector-effect="none" d="M772.244,1232.85 L795.866,1232.85 L795.866,1256.47 L772.244,1256.47 L772.244,1232.85" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[76].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(76)}  vector-effect="none" d="M870.749,1350.9 L894.371,1350.9 L894.371,1374.52 L870.749,1374.52 L870.749,1350.9" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[77].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(77)}  vector-effect="none" d="M849.131,1020.15 L872.753,1020.15 L872.753,1043.77 L849.131,1043.77 L849.131,1020.15" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[78].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(78)}  vector-effect="none" d="M1314.5,1135.92 L1338.12,1135.92 L1338.12,1159.54 L1314.5,1159.54 L1314.5,1135.92" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[79].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(79)}  vector-effect="none" d="M1644.85,1713.29 L1668.47,1713.29 L1668.47,1736.91 L1644.85,1736.91 L1644.85,1713.29" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[80].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(80)}  vector-effect="none" d="M674.909,1428.75 L698.531,1428.75 L698.531,1452.37 L674.909,1452.37 L674.909,1428.75" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[81].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(81)}  vector-effect="none" d="M1473.02,2118.51 L1496.64,2118.51 L1496.64,2142.13 L1473.02,2142.13 L1473.02,2118.51" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[82].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(82)}  vector-effect="none" d="M1937.41,1962.89 L1961.03,1962.89 L1961.03,1986.51 L1937.41,1986.51 L1937.41,1962.89" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[83].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(83)}  vector-effect="none" d="M1929.71,1966.43 L1953.33,1966.43 L1953.33,1990.05 L1929.71,1990.05 L1929.71,1966.43" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[84].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(84)}  vector-effect="none" d="M1472.6,2054.25 L1496.22,2054.25 L1496.22,2077.88 L1472.6,2077.88 L1472.6,2054.25" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[85].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(85)}  vector-effect="none" d="M1475.27,2055.38 L1498.89,2055.38 L1498.89,2079 L1475.27,2079 L1475.27,2055.38" fill-rule="evenodd"/></Tooltip>)})}
  </g>
  <g fill-opacity="0" stroke-width="4.16667" stroke-opacity="1" transform="matrix(0.999751,0,0,0.999751,0,0)" stroke-linecap="square" font-weight="400" font-family="MS Shell Dlg 2" fill="#000000" stroke="#097138" font-size="32.5" stroke-linejoin="bevel" font-style="normal">

        {[86].map((tooltipValue) => {
          const objetoEncontrado = lotes.find(item => item.mapa1 == tooltipValue);
          return (
            <Tooltip title={objetoEncontrado ? "Manzana "+objetoEncontrado.manzana+" Lote "+objetoEncontrado.lote : 'Sin datos'}>
            <path onClick={() => handleOpenDialog(86)}  vector-effect="none" d="M819.302,1086.55 L842.924,1086.55 L842.924,1110.17 L819.302,1110.17 L819.302,1086.55" fill-rule="evenodd"/></Tooltip>)})}
  </g>

          
        
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