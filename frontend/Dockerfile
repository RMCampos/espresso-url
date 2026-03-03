FROM node:20-alpine AS build
ARG VITE_BUILD
ARG VITE_SERVER_URL
ENV VITE_BUILD=${VITE_BUILD}
ENV VITE_SERVER_URL=${VITE_SERVER_URL}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
