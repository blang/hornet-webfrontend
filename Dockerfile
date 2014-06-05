FROM blang/nginx:latest

ADD docker/nginx.conf /etc/nginx/sites-enabled/site
ADD dist/ /var/www/