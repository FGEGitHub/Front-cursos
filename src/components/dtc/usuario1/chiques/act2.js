import React, { useEffect, useMemo, useRef, useState } from 'react';
import servicioDtc from '../../../../services/dtc';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';

const MAIN_COLORS = {
  tratamiento: '#6abb3a',
  sinTratamiento: '#dbe9d1',
  judicializados: '#c62828',
  noJudicializados: '#ff9800',
};

const INTERVENTION_COLORS = {
  'Sin dato': '#cbd5c0',
  'Asistencia Social': '#9ac97b',
  intervencion: '#86bb65',
  'Intervencion interinstitucional': '#729f53',
  'Intervencion Social': '#6abb3a',
  'Visita Domiciliaria': '#4f8b33',
  'visita social': '#bedb9d',
};

const normalizeName = (value) => {
  const txt = String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!txt) return 'Sin dato';
  if (txt === 'visita domicialiria' || txt === 'visista domiciliaria') return 'Visita Domiciliaria';
  if (txt === 'sin dato') return 'Sin dato';
  if (txt === 'asistencia social') return 'Asistencia Social';
  if (txt === 'intervencion') return 'intervencion';
  if (txt === 'intervencion interinstitucional') return 'Intervencion interinstitucional';
  if (txt === 'intervencion social') return 'Intervencion Social';
  if (txt === 'visita domiciliaria') return 'Visita Domiciliaria';
  if (txt === 'visita social') return 'visita social';

  return value;
};

const DashboardMetricCard = ({ label, value }) => (
  <Card
    sx={{
      borderRadius: '22px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(15,23,42,0.05)',
      background: '#fff',
      height: '100%',
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: '#64748b',
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 1.5,
          fontSize: { xs: 34, md: 38 },
          fontWeight: 700,
          color: '#6abb3a',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const DonutChart = ({ title, subtitle, data, total, colors }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data?.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 360;
    const center = size / 2;
    const radius = 118;
    const innerRadius = 74;

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    let startAngle = -Math.PI / 2;
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);

    data.forEach((item) => {
      const angle = (item.value / totalValue) * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(center, center, radius, startAngle, startAngle + angle);
      ctx.arc(center, center, innerRadius, startAngle + angle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = colors[item.name] || '#6abb3a';
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      startAngle += angle;
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 16px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Total', center, center - 8);

    ctx.fillStyle = '#0f172a';
    ctx.font = '700 34px Inter, Arial';
    ctx.fillText(String(total), center, center + 26);
  }, [data, total, colors]);

  return (
    <Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          color: '#1e293b',
          fontSize: 28,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          textAlign: 'center',
          color: '#4f8b33',
          fontWeight: 700,
          mb: 1,
        }}
      >
        {subtitle}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            maxWidth: 360,
            height: 'auto',
          }}
        />
      </Box>
    </Box>
  );
};

export default function TablaNotificaciones() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [stats, setStats] = useState({
    total: 0,
    tratamiento: 0,
    judicializados: 0,
    noJudicializados: 0,
    sinTratamiento: 0,
  });

  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    try {
      const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
      if (!loggedUserJSON) return;

      const usuario = JSON.parse(loggedUserJSON);

      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

      const historial = await servicioDtc.traerestadisticas({
        fecha: formattedDate,
        id_usuario: usuario.id,
      });

      const resumen = historial?.[1];

      if (resumen) {
        const total = Number(resumen.cantidad_usuarios || 0);
        const tratamiento = Number(resumen.cantidad_tratamiento || 0);
        const judicializados = Number(resumen.cantidad_judicializados || 0);

        setStats({
          total,
          tratamiento,
          judicializados,
          noJudicializados: Math.max(tratamiento - judicializados, 0),
          sinTratamiento: Math.max(total - tratamiento, 0),
        });
      }

      const raw = historial?.[2]?.OTRAS2 || historial?.[2] || [];

      if (Array.isArray(raw)) {
        const grouped = {};

        raw.forEach((item) => {
          const name = normalizeName(item.name);
          const value = Number(item.value || 0);

          grouped[name] = (grouped[name] || 0) + value;
        });

        const normalized = Object.keys(INTERVENTION_COLORS)
          .map((name) => ({
            name,
            value: grouped[name] || 0,
          }))
          .filter((x) => x.value > 0);

        setInterventions(normalized);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalVisitas = useMemo(
    () => interventions.reduce((acc, item) => acc + item.value, 0),
    [interventions]
  );

  const treatmentSegments = [
    { name: 'En tratamiento', value: stats.tratamiento },
    { name: 'Sin tratamiento', value: stats.sinTratamiento },
  ];

  const treatmentColors = {
    'En tratamiento': MAIN_COLORS.tratamiento,
    'Sin tratamiento': MAIN_COLORS.sinTratamiento,
  };

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, background: '#f8fafc' }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} xl={2.4}>
          <DashboardMetricCard label="Total Usuarios" value={stats.total} />
        </Grid>
        <Grid item xs={12} md={6} xl={2.4}>
          <DashboardMetricCard label="En Tratamiento" value={stats.tratamiento} />
        </Grid>
        <Grid item xs={12} md={6} xl={2.4}>
          <DashboardMetricCard label="No Judicializados" value={stats.noJudicializados} />
        </Grid>
        <Grid item xs={12} md={6} xl={2.4}>
          <DashboardMetricCard label="Judicializados" value={stats.judicializados} />
        </Grid>
        <Grid item xs={12} md={6} xl={2.4}>
          <DashboardMetricCard label="Sin Tratamiento" value={stats.sinTratamiento} />
        </Grid>
      </Grid>

      <Card
        sx={{
          borderRadius: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 12px rgba(15,23,42,0.06)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '14px',
                  background: '#eef8e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6abb3a',
                }}
              >
                <BarChartIcon />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 34, fontWeight: 300, color: '#334155' }}>
                  Situacion Psicosocial
                </Typography>
                <Typography sx={{ color: '#64748b', fontSize: 14 }}>
                  Lectura general del dispositivo e intervenciones registradas
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ color: '#4f7f2c', fontWeight: 700, fontSize: 15 }}>
              Total visitas: {totalVisitas}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 3,
              p: { xs: 1.5, md: 2 },
              borderRadius: '28px',
              border: '1px solid #e2e8f0',
              background: 'rgba(248,250,252,0.9)',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Card
                  sx={{
                    borderRadius: '24px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 8px rgba(15,23,42,0.05)',
                    p: 2,
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.6fr) 180px',
                      gap: 2,
                      alignItems: 'start',
                    }}
                  >
                    <DonutChart
                      title="General"
                      subtitle={`Total usuarios: ${stats.total}`}
                      data={treatmentSegments}
                      total={stats.total}
                      colors={treatmentColors}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: isMobile ? 0 : 2 }}>
                      <Box
                        sx={{
                          borderRadius: '18px',
                          border: '1px solid #d7ebc9',
                          background: '#f7fbf3',
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.18em',
                            color: '#64748b',
                          }}
                        >
                          Total usuarios
                        </Typography>

                        <Typography sx={{ mt: 1, fontSize: 44, fontWeight: 700, color: '#0f172a' }}>
                          {stats.total}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          borderRadius: '18px',
                          border: '1px solid #e2e8f0',
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.18em',
                            color: '#64748b',
                          }}
                        >
                          Referencias
                        </Typography>

                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {treatmentSegments.map((item) => (
                            <Box
                              key={item.name}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 1,
                                px: 1.5,
                                py: 1.2,
                                borderRadius: '12px',
                                background: '#f8fafc',
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: treatmentColors[item.name],
                                  }}
                                />
                                <Typography sx={{ fontSize: 13, color: '#334155' }}>
                                  {item.name}
                                </Typography>
                              </Box>

                              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                {item.value}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Card
                  sx={{
                    borderRadius: '24px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 8px rgba(15,23,42,0.05)',
                    p: 2,
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.6fr) 180px',
                      gap: 2,
                      alignItems: 'start',
                    }}
                  >
                    <DonutChart
                      title="Otras Intervenciones"
                      subtitle={`Total visitas: ${totalVisitas}`}
                      data={interventions}
                      total={totalVisitas}
                      colors={INTERVENTION_COLORS}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: isMobile ? 0 : 2 }}>
                      <Box
                        sx={{
                          borderRadius: '18px',
                          border: '1px solid #d7ebc9',
                          background: '#f7fbf3',
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.18em',
                            color: '#64748b',
                          }}
                        >
                          Total visitas
                        </Typography>

                        <Typography sx={{ mt: 1, fontSize: 44, fontWeight: 700, color: '#0f172a' }}>
                          {totalVisitas}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          borderRadius: '18px',
                          border: '1px solid #e2e8f0',
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.18em',
                            color: '#64748b',
                          }}
                        >
                          Referencias
                        </Typography>

                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {interventions.map((item) => (
                            <Box
                              key={item.name}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 1,
                                px: 1.5,
                                py: 1.2,
                                borderRadius: '12px',
                                background: '#f8fafc',
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  minWidth: 0,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: INTERVENTION_COLORS[item.name],
                                    flexShrink: 0,
                                  }}
                                />

                                <Typography
                                  sx={{
                                    fontSize: 13,
                                    color: '#334155',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Box>

                              <Typography sx={{ fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                                {item.value}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
