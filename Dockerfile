FROM caddy:2.8.4-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY dist /usr/share/caddy
