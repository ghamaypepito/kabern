<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'R+xL0Vifu4O4BFua2lC1xMj7uuzZtj/ESEtv4eP2prF4+inl/eoeV1QLSj7tDQrE7ikDfWGeQfy2eQfxVPJ63g==');
define('SECURE_AUTH_KEY',  'XkmKIUDjrLEEecYr6eLr9IKadun5pdhk+LVmgufRwBEJUhVtV1qo3OgvCd0Eo/76kQ/Ne6UrhKNsdajHZ4XQsw==');
define('LOGGED_IN_KEY',    'CDb/fmVeolp4EFsBlD4iGFqeo6NYMbLVmnpg4dH6PzVgMUiB4r4ls+ptK8IrmZzr8WJMXTpO+vcbPC9KG83/+A==');
define('NONCE_KEY',        'YIXzYuUGG4JeMoUoOtXaiWQYB3NaMhuBkxaSR5g0COQ3gaYbzh4qgG6ff+aFNd4FFjIDClP7CI5SdLri//ilZQ==');
define('AUTH_SALT',        'uE52eIS81HrO07IVW8qNl5FfJ25QCTFOSHnEaZElN7rqYKv89jyML1T0SKBJao4/YSFWK/fXKcJB7P3mF+/pdg==');
define('SECURE_AUTH_SALT', 'Yoe49xiFKJp7UuPo+Sj/vpqTyV332mDq4PDRQpq0Up01E16CgT2KH0/3LA3czH/zqnA6/SQR6twQCqHy3Ck5uQ==');
define('LOGGED_IN_SALT',   'PHzBeQlRmpezKwU93zvEryMUYusES8Q91Gd9tmxMKI4Al45eX0Wnp9DU0B8S+Ax3R0LQ3OT13aYbJUipRdsySA==');
define('NONCE_SALT',       'CbAeWcLkU/qgXiVGlt/LUrJHVKVxao2U8mDEPDVqmsjKPWhWJ9bTW01MlJNGBgWYAf11v5rWMb8VQEtstaDqnQ==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
