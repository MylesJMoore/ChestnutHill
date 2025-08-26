# ----- Build stage: install PHP deps with Composer -----
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts
# copy the rest to let post-autoload-dump run later
COPY . .
RUN composer dump-autoload --optimize

# ----- Runtime stage: PHP-FPM (Alpine) -----
FROM php:8.3-fpm-alpine
WORKDIR /var/www/html

# System libs for common Laravel extensions (pgsql, gd, etc.)
RUN apk add --no-cache \
    bash curl git icu-dev oniguruma-dev libzip-dev libpng-dev freetype-dev libjpeg-turbo-dev \
    postgresql-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    bcmath exif intl mbstring pcntl zip gd pdo pdo_pgsql opcache

# Opcache for perf (still fine for local)
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.validate_timestamps=1'; \
    echo 'opcache.revalidate_freq=0'; \
    } > /usr/local/etc/php/conf.d/opcache.ini

# Copy app code & vendor from build stage
COPY --from=vendor /app /var/www/html

# Laravel storage/permissions
RUN addgroup -g 1000 laravel && adduser -D -u 1000 -G laravel laravel \
    && chown -R laravel:laravel /var/www/html \
    && chmod -R ug+rwx storage bootstrap/cache

USER laravel
CMD ["php-fpm"]
