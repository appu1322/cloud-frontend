FROM node:16-alpine As builder

ARG VITE_BASE_URL="Invalid"
ENV VITE_BASE_URL ${VITE_BASE_URL}

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build

# Nginx state serving content
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /usr/app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]



