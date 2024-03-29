import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Rating from './rating'
import Autocomplete from '@mui/material/Autocomplete';


export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [usuarioo, setUsuarioo] = useState()
  const [prom, setProm] = useState({})
  const [turnos, setTurnos] = useState()
  const [turnos2, setTurnos2] = useState()
  const [escuela, setEscuela] = useState({})
  const [activo, setActivo] = useState(false)
  const [dato, setDato] = useState({})
  const [rechazo, setRechazo] = useState(false)
  const [observaciones, setObservaciones] = useState()

  const traer = async () => {
    setUsuarioo()
    const turnos = await servicioFide.traerescuelas()
    const falt = await servicioFide.traerescuelasfalt()
    const ob = await servicioFide.traerobservaciones(props.dni)
    setObservaciones(ob)
    setTurnos2(turnos)
    setTurnos(falt)
    setActivo(true)


  }

  const [inscripcion, setInscripcion] = useState({})



  const handleClickOpen = async () => {
    await traer()
    setOpen(true);
    setInscripcion(({

      dni: props.dni,

      id_inscripcion: props.id_inscripcion,
      nombre: props.nombre,
      apellido: props.apellido,
      dni: props.dni

    }))
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };


  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
  }
  ///// funcion para traer rating
  const traer2 = async (e) => {
    const dat = await servicioFide.traerestadisticasdeescuelas({ id1: e.id})
    setDato({ ...dato, [e.target.name]: dat })
    setEscuela({ ...escuela, [e.target.name]: dat.cantidad_escuela1 })
 
    setProm({ 'promedio': dat.prom })
    console.log(escuela)
    console.log(dato)

  }
  const Cambiorechazo = () => {

  
    setRechazo(!rechazo)

   


  }
  const traerdondevota = async (e) => {

    console.log(e.id)
    const dat = await servicioFide.traerestadisticasdeescuelas({ id1: e.id})
    console.log(dat)
    setDato({ ...dato, ['id_donde_vota']: dat })
    console.log(dato['id_donde_vota'])
    setEscuela({ ...escuela, 'id_donde_vota': dat.cantidad_escuela1 })

    setProm({ 'promedio': dat.prom })

  }
  const handleChangedondevota = (e, option) => {
    console.log(e)
    console.log(option)
    setInscripcion({ ...inscripcion, 'id_donde_vota': option.id })
    traerdondevota(option)

  }

  const traerid_escuela = async (e) => {

    
    const dat = await servicioFide.traerestadisticasdeescuelas({ id1: e.id})
    setDato({ ...dato, ['id_escuela']: dat })
    setEscuela({ ...escuela, 'id_escuela': dat.cantidad_escuela1 })
    setProm({ 'promedio': dat.prom })

  }
  const handleChangeid_escuela = (e, option) => {
   
    setInscripcion({ ...inscripcion, 'id_escuela': option.id  })
    traerid_escuela(option)

  }

  const traerid_escuela2 = async (e) => {

    
    const dat = await servicioFide.traerestadisticasdeescuelas({ id1: e.id})
    console.log(dat)
    setDato({ ...dato, ['id_escuela2']: dat })
    
    setEscuela({ ...escuela, 'id_escuela2': dat.cantidad_escuela1 })
    console.log(escuela)
    setProm({ 'promedio': dat.prom })

  }
  const handleChangeid_escuela2 = (e, option) => {
   
    setInscripcion({ ...inscripcion, 'id_escuela2':  option.id   })
    traerid_escuela2(option)

  }
  

  const handleRechazar = async (event) => {
    try {

     const Resp = await servicioFide.rechazarincrip(
        inscripcion)
      props.getClients()
      alert(Resp)
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
    setOpen(false);
  };/////
  const handlenocontestado = async (event) => {
    try {

      await servicioFide.marcarnocontestado(
        inscripcion

      )
      props.getClients()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
    setOpen(false);
  };/////
  const handleDeterminar = async (event) => {
    try {

      await servicioFide.inscribir(
        inscripcion

      )
      props.getClients()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
    setOpen(false);
  };/////


  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (



    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box

        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        < Tooltip title="Ver inscripcion">
          <BorderColorIcon variant="outlined" onClick={handleClickOpen} />
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
        {props.estado=== "No contestado" ? <> <Button variant="contained" color="success" onClick={handlenocontestado} >Volver al estado pendiente</Button></>:<>
        <Button variant="outlined" color="warning" onClick={handlenocontestado} >Marcar como no contestado </Button></>}
          {activo ? <>
            {observaciones ? <><h4 style={{ color: 'crimson' }} >Observaciones: <br/>
            {observaciones.map((ob)=>
              ob.detalle
            )}
            
            </h4></>:<>Sin observaciones</>} 
            <DialogContent>


              
              <h3>Asignaciona escuela {props.nombre}{props.apellido} </h3>
              <br />
              Inscripto el dia: {props.fecha_carga}<br />
              DNI:  {props.dni}<br />


              Se entero mediante: {props.como_se_entero}
              {props.como_se_entero === "Amigo" ? <>
                <br /> Apellido Amigo: {props.apellido_referido}  <br />
                Nombre Amigo:{props.nombre_referido}  <br /></> : <></>}
              <br />
              <p onClick={() => window.open('https://wa.me/' + props.telefono)}   > <b>Telefono: {props.telefono}</b> <br />Click aca apra enviar whatsap<WhatsAppIcon /> </p> <br />
              <p onClick={() => window.open('https://wa.me/' + props.telefono2)}   > <b>Telefono 2: {props.telefono2}</b> <br />Click aca apra enviar whatsap<WhatsAppIcon /> </p> <br />

              {prom.promedio ? <>Promedio de votantes por escuela: {prom.promedio}</> : <></>}

              <h2> <HowToVoteIcon /> Elegir en que escuela vota </h2><br/>
              <Autocomplete
                options={turnos2}
                getOptionLabel={(optiond) => optiond.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Elegir en que escuela vota"
                   name="id_donde_vota"
                    variant="outlined"
                   
                  />
                )}
                autoHighlight
                autoSelect
            

                onChange ={handleChangedondevota}
              
                native // Habilita la selección nativa
              />
              
              {escuela.id_donde_vota ? <>Cantidad de votantes en la escuela: {escuela.id_donde_vota}<br />
              Encargado: {dato ?  <>    {dato.id_donde_vota ?  <>{dato['id_donde_vota'].Encargado} </>:<>sin encargado</>}   </>            :<>sin datos</>}<br/>
              Tel:{dato ?  <>    {dato.id_donde_vota ?  <>{dato['id_donde_vota'].tel} </>:<>sin encargado</>}   </>            :<>sin datos</>}<br />
                <Rating
                  valor={(escuela.id_donde_vota / (prom.promedio / 2))}
                  texto={"Rating votantes"}

                />
              </> : <></>}<br />
              { !rechazo ? <>
              <h2>Elegir prioridades </h2>
              <br />
              <LooksOneIcon />   <label>Escuela prioridad 1</label>
              <Autocomplete
                options={turnos}
                getOptionLabel={(option1) => option1.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Elegir en que escuela vota"
                   name="id_donde_vota"
                    variant="outlined"
                   
                  />
                )}
                autoHighlight
                autoSelect
            

                onChange ={handleChangeid_escuela}
              
                native // Habilita la selección nativa
              />
              
              {escuela.id_escuela ? <>Cantidad de votantes en la escuela: {escuela.id_escuela} <br />
                Cantidad de mesas: {dato.id_escuela ? <>   {dato.id_escuela.mesas} de las cuales <b> {dato.id_escuela.suplentes} son suplentes</b> </> : <>Cargando</>}<br />
                {dato.id_escuela ? <>  {dato.id_escuela.libres == 0 ? <><p style={{ color: 'crimson' }} > Mesas Libres: {dato.id_escuela.libres}  (Escuela llena)</p> </> : <>Mesas Libres: {dato.id_escuela.libres-dato.id_escuela.suplentes > 0 ? <> {dato.id_escuela.libres}(lugar disponible titular) </>:<><p style={{ color: 'crimson' }} >{dato.id_escuela.libres} pero es/son suplente/s</p></>} </>} </> : <>Cargando</>}
                <br/>
                Encargado: {dato ?  <>    {dato.id_escuela ?  <>{dato['id_escuela'].Encargado} </>:<>sin encargado</>}   </>            :<>sin datos</>}<br/>
              Tel:{dato ?  <>    {dato.id_escuela ?  <>{dato['id_escuela'].tel} </>:<>sin encargado</>}   </>            :<>sin datos</>}<br />
                <Rating
                  valor={(escuela.id_escuela / (prom.promedio / 2))}
                  texto={"Rating votantes"}
                />

              </> : <></>}<br />
              <LooksTwoIcon />    <label>Escuela prioridad 2</label>

              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Escuela 2
              </InputLabel>
              <Autocomplete
                options={turnos}
                getOptionLabel={(option2) => option2.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Elegir en que escuela vota"
                   name="id_donde_vota"
                    variant="outlined"
                   
                  />
                )}
                autoHighlight
                autoSelect
            

                onChange ={handleChangeid_escuela2}
              
                native // Habilita la selección nativa
              />
              {escuela.id_escuela2 ? <>Cantidad de votantes en la escuela: {escuela.id_escuela2} <br />
                Cantidad de mesas: {dato.id_escuela2 ? <>   {dato.id_escuela2.mesas} de las cuales <b> {dato.id_escuela2.suplentes} son suplentes</b> </> : <>Cargando</>}<br />
                {dato.id_escuela2 ? <>  {dato.id_escuela2.libres == 0 ? <><p style={{ color: 'crimson' }} > Mesas Libres: {dato.id_escuela2.libres}  (Escuela llena)</p> </> : <>Mesas Libres: {dato.id_escuela2.libres} </>} </> : <>Cargando</>}
                {dato.id_escuela2 ? <>  {dato.id_escuela2.libres == 0 ? <><p style={{ color: 'crimson' }} > Mesas Libres: {dato.id_escuela2.libres}  (Escuela llena)</p> </> : <>Mesas Libres: {dato.id_escuela2.libres-dato.id_escuela2.suplentes > 0 ? <> {dato.id_escuela2.libres}(lugar disponible titular) </>:<><p style={{ color: 'crimson' }} >{dato.id_escuela2.libres} pero es/son suplente/s</p></>} </>} </> : <>Cargando</>}

               <br/>
                Encargado: {dato ?  <>    {dato.id_escuela2 ?  <>{dato['id_escuela2'].Encargado} </>:<>sin encargado</>}   </>            :<>sin datos</>}<br/>
              Tel:{dato ?  <>    {dato.id_escuela2 ?  <>{dato['id_escuela2'].tel} </>:<>sin encargado</>}   </>            :<>sin datos</>}<br />
                
                <Rating
                  valor={(escuela.id_escuela2 / (prom.promedio / 2))}
                  texto={"Rating votantes"}
                /></> : <></>}<br />
              <h3> MODIFICAR DATOS PERSONALES <ContactEmergencyIcon /></h3>

              <TextField
                
                margin="dense"
                id="name"
                label="Nombre "
                name="nombre"
                onChange={handleChange}
                fullWidth
                variant="standard"
                defaultValue={props.nombre}
              />

              <TextField
                
                margin="dense"
                id="name"
                label="Apellido"
                name="apellido"
                onChange={handleChange}
                fullWidth
                variant="standard"
                defaultValue={props.apellido}
              />
              <TextField
                
                margin="dense"
                id="name"
                label="DNI"
                name="dni"
                onChange={handleChange}
                fullWidth
                type="number"
                variant="standard"
                defaultValue={props.dni}
              />

              <TextField
                
                margin="dense"
                id="name"
                label="Domicilio"
                name="domicilio"
                onChange={handleChange}
                fullWidth
                variant="standard"
              />
              <br />
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                ¿ Fuiste fiscal antes?
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                  name: 'fiscal_antes',
                  id: 'uncontrolled-native',

                }}
              >   <option value={'Sin determinar'}>Sin determinar</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>

              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                ¿ Dispones de movilidad ?
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                  name: 'movilidad',
                  id: 'uncontrolled-native',

                }}
              >   <option value={'Sin determinar'}>Sin determinar</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                ¿ Sos celiaco ?
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                  name: 'celiaco',
                  id: 'uncontrolled-native',

                }}
              >   <option value={'Sin determinar'}>Sin determinar</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                ¿ Sos Vegetariano?
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                  name: 'vegano',
                  id: 'uncontrolled-native',

                }}
              >   <option value={'Sin determinar'}>Sin determinar</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>
              <br/>
              <TextField
                
                margin="dense"
                id="name"
                label="Observaciones "
                name="observaciones"
                onChange={handleChange}
                fullWidth
                variant="standard"

              />

<br/>
 <Button  onClick={Cambiorechazo} >Rechazar inscripcion</Button>
             
</>: <>

<TextField
                
                margin="dense"
                id="name"
                label="Observaciones "
                name="observaciones"
                onChange={handleChange}
                fullWidth
                variant="standard"

              />     

<Button  onClick={Cambiorechazo} >Aceptar inscripcion</Button>
</>}
              <DialogActions>

{!rechazo ? <>
                {inscripcion.id_donde_vota && inscripcion.observaciones && inscripcion.celiaco && inscripcion.fiscal_antes && inscripcion.movilidad && inscripcion.vegano && inscripcion.domicilio && inscripcion.id_escuela && inscripcion.id_escuela2 ? <>         <Button variant="contained" color="primary" onClick={handleDeterminar} >Enviar</Button></> : <><p style={{ color: 'crimson' }} >COMPLETAR TODOS LOS DATOS</p></>}
                </>: <>
              {inscripcion.id_donde_vota && inscripcion.observaciones ? <> <Button variant="outlined"  onClick={handleRechazar} >Rechazar </Button></>:<>Completar datos</>}  
                </>}

                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

              </DialogActions>


            </DialogContent>
          </> : <>Cargando</>}
        </Dialog>
      </Box >

    </div>
  );
}
