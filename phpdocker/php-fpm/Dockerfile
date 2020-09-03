FROM php:7.4-fpm

WORKDIR "/application"

ARG WITH_XDEBUG=false

# OpenSSL and git
RUN apt-get update \
  && apt-get install -y \
  openssl

# PHP intl extension
RUN apt-get update \
  && apt-get install -y libicu-dev \
  && docker-php-ext-configure intl \
  && docker-php-ext-install intl

# DOM / XML
RUN apt-get update \
  && apt-get install -y \
  libxml2-dev \
  libxslt-dev \
  && docker-php-ext-install \
  dom \
  xmlrpc \
  xsl

# MySQL / PDO
RUN docker-php-ext-install \
  mysqli \
  pdo \
  pdo_mysql

# Install XDebug is it required.
RUN if [ $WITH_XDEBUG = "true" ] ; then \
        pecl install xdebug; \
        docker-php-ext-enable xdebug; \
        echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini; \
        echo "display_startup_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini; \
        echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini; \
        echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini; \
    fi ;

# zip / bz2
RUN apt-get update \
  && apt-get install -y \
  libonig-dev \
  libzip-dev \
  libbz2-dev \
  zlib1g-dev \
  && docker-php-ext-install \
  zip \
  bz2

# GD
RUN apt-get update \
  && apt-get install -y libpng-dev \
  && docker-php-ext-install gd

RUN apt-get update \
  && apt-get install -y apt-transport-https \
  ca-certificates \
  gnupg2

# MBString
RUN docker-php-ext-install \
  gettext \
  mbstring

# Clean up caches etc
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/*

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Setup nginx's default user and group permissions
RUN usermod -u 1000 www-data

# Copy existing application directory contents
# COPY . /var/www/overwatch
RUN chown -R www-data:www-data /application

# Change current user to www
USER www-data
