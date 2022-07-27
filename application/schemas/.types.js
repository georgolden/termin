({
  datetime: { js: 'string', metadata: { pg: 'timestamp with time zone' } },
  json: { metadata: { pg: 'jsonb' } },
  ip: { js: 'string', metadata: { pg: 'inet' } },
  date: { js: 'string', metadata: { pg: 'date' } },
  time: { js: 'string', metadata: { pg: 'time with time zone' } },
});
