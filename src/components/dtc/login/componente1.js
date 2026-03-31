import React, { useState, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Paper,
} from '@material-ui/core';
import {
  AccountCircle,
  Lock,
  ExitToApp,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../Assets/inviernodtc.png';
import servicioLogin from '../../../services/login';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    background:
      'linear-gradient(180deg, #eef2ec 0%, #e3e9de 45%, #dfe7d8 100%)',
    boxSizing: 'border-box',
  },

  card: {
    width: 560,
    maxWidth: '100%',
    borderRadius: 32,
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(226,232,240,0.7)',
    boxShadow: '0 24px 55px rgba(15,23,42,0.18)',
  },

  topBar: {
    width: '100%',
    height: 4,
    background:
      'linear-gradient(90deg, #6abb3a 0%, #5da731 55%, #355420 100%)',
  },

  content: {
    padding: theme.spacing(4, 5, 3, 5),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
    },
  },

  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },

  logo: {
    width: 290,
    maxWidth: '100%',
    objectFit: 'contain',
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: theme.spacing(1),
  },

  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 15,
    marginBottom: theme.spacing(4),
    lineHeight: 1.5,
  },

  fieldGroup: {
    marginBottom: theme.spacing(2.5),
  },

  label: {
    display: 'block',
    marginBottom: theme.spacing(1),
    color: '#475569',
    fontWeight: 600,
    fontSize: 14,
  },

  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 16,
      backgroundColor: '#ffffff',
      transition: 'all .25s ease',
      paddingLeft: 2,

      '& fieldset': {
        borderColor: '#e2e8f0',
      },

      '&:hover fieldset': {
        borderColor: '#cbd5e1',
      },

      '&.Mui-focused': {
        boxShadow: '0 0 0 4px rgba(106,187,58,0.15)',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#6abb3a',
      },
    },

    '& .MuiOutlinedInput-input': {
      padding: '14px 14px 14px 4px',
      fontSize: 15,
      color: '#0f172a',
    },

    '& .MuiInputAdornment-root': {
      marginRight: 6,
    },

    '& .MuiSvgIcon-root': {
      color: '#6abb3a',
      fontSize: 22,
      transition: 'color .25s ease',
    },
  },

  button: {
    marginTop: theme.spacing(1),
    width: '100%',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#6abb3a',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: 15,
    boxShadow: '0 12px 25px rgba(106,187,58,0.30)',
    transition: 'all .25s ease',

    '&:hover': {
      backgroundColor: '#5da731',
      boxShadow: '0 16px 28px rgba(106,187,58,0.38)',
      transform: 'translateY(-1px)',
    },

    '&:active': {
      transform: 'scale(0.98)',
    },

    '&:disabled': {
      backgroundColor: '#9fcd82',
      color: '#fff',
    },
  },

  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },

  institutionalSection: {
    position: 'relative',
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
  },

  divider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderTop: '1px solid rgba(203,213,225,0.7)',
  },

  institutionalText: {
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#94a3b8',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },

  muniLogo: {
    display: 'block',
    margin: '0 auto',
    height: 28,
    opacity: 0.3,
    filter: 'grayscale(100%)',
    transition: 'all .35s ease',

    '&:hover': {
      opacity: 1,
      filter: 'grayscale(0%)',
    },
  },
}));

const getRedirectRoute = (nivel) => {
  switch (String(nivel)) {
    case '20':
      return '/dtc/usuario1/menu';
    case '21':
      return '/dtc/usuario2/asistencia';
    case '22':
      return '/dtc/cocina';
    case '23':
      return '/dtc/turnos/lista';
    case '24':
      return '/dtc/psicologa/turnos';
    case '25':
      return '/dtc/sole/inicio';
    case '26':
      return '/dtc/tallerprincipal';
    case '27':
      return '/dtc/gimnasioclases';
    case '28':
      return '/dtc/visitasocial/menu';
    case '29':
      return '/dtc/fines/menu';
    case '31':
      return '/dtc/meriendas';
    default:
      return null;
  }
};

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('loggedNoteAppUser');

      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const route = getRedirectRoute(user?.nivel);

      if (route) {
        navigate(route, { replace: true });
      } else {
        localStorage.removeItem('loggedNoteAppUser');
      }
    } catch {
      localStorage.removeItem('loggedNoteAppUser');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.usuario.trim() || !form.password.trim()) {
      alert('Debe completar usuario y contraseña');
      return;
    }

    try {
      setLoading(true);

      const response = await servicioLogin.login({
        usuario: form.usuario.trim(),
        password: form.password,
      });

      const user = {
        id: response.id || response.id_usuario || null,
        token: response.token || '',
        nombre: response.nombre || '',
        usuario: response.usuario || form.usuario,
        nivel: response.nivel,
      };

      localStorage.setItem(
        'loggedNoteAppUser',
        JSON.stringify(user)
      );

      const route = getRedirectRoute(user.nivel);

      if (!route) {
        throw new Error('Usuario sin permisos');
      }

      navigate(route, { replace: true });
    } catch (error) {
      console.error(error);
      alert('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />

      <div className={classes.root}>
        <Paper elevation={0} className={classes.card}>
          <div className={classes.topBar} />

          <div className={classes.content}>
            <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1,
    marginTop: "16px",
    marginBottom: "8px",
  }}
>
  <span
    style={{
      fontSize: "38px",
      fontWeight: 800,
      letterSpacing: "-1px",
      color: "#0f172a",
      fontFamily: "'Segoe UI', sans-serif",
    }}
  >
    Inclusion
    <span
      style={{
        color: "#6abb3a",
        marginLeft: "2px",
      }}
    >
      Social
    </span>
  </span>

  <span
    style={{
      marginTop: "6px",
      fontSize: "11px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.35em",
      color: "#94a3b8",
    }}
  >
    Gestión Integral
  </span>
</div>

            <Typography className={classes.title}>
              Portal de Acceso
            </Typography>

            <Typography className={classes.subtitle}>
              Inclusión social, bienestar y desarrollo comunitario.
            </Typography>

            <form onSubmit={handleSubmit}>
              <div className={classes.fieldGroup}>
                <Typography className={classes.label}>
                  Usuario
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="username"
                  className={classes.textField}
                  placeholder="Tu usuario"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className={classes.fieldGroup}>
                <Typography className={classes.label}>
                  Contraseña
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="current-password"
                  className={classes.textField}
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={classes.button}
              >
                <div className={classes.buttonContent}>
                  {loading ? (
                    <>
                      <CircularProgress
                        size={18}
                        style={{ color: '#fff' }}
                      />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <ExitToApp fontSize="small" />
                      Iniciar Sesión
                    </>
                  )}
                </div>
              </Button>
            </form>

            <div className={classes.institutionalSection}>
              <div className={classes.divider} />

              <Typography className={classes.institutionalText}>
                Institucional
              </Typography>

              <img
                src={Logo}
                alt="Municipalidad"
                className={classes.muniLogo}
              />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default LoginForm;