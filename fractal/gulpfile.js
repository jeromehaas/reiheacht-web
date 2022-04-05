const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const babel = require('gulp-babel');
const del = require('del');
const plumber = require('gulp-plumber');
const notifier = require('gulp-notifier');
const svgmin = require('gulp-svgmin');
const sass = require('gulp-sass')(require('sass'));
const favicons = require('gulp-favicons');
const svgSprite = require('gulp-svg-sprite');
const gulpCopy = require('gulp-copy');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');

// SOURCE PATHS
const filePaths = {
	scss: {
		src: ['./public/scss/configs/reset.scss', './public/scss/configs/icons.scss', './public/scss/configs/fonts.scss', './public/fonts/nucleo/nucleo.scss', './public/scss/configs/variables.scss', './public/scss/configs/keyframes.scss', './public/scss/configs/typography.scss', './public/scss/configs/mixins.scss', './public/scss/configs/global.scss', './public/media/icons/sprite/sprite.scss', './components/**/*.scss'],
		dist: ['./public/css', '../craft/web/css']
	},
	fonts: {
		src: ['./public/fonts/**/*.+(ttf|woff|woff2)'],
		dist: ['../craft/web/fonts']
	},
	js: {
		src: ['./public/js/main.js', './components/**/*.js'],
		dist: ['./public/js', '../craft/web/js']
	},
	image: {
		src: ['./public/media/images/**/*.+(png|jpg|jpeg|gif)'],
		dist: ['../craft/web/public/media/images']
	},
	graphic: {
		src: ['./public/media/graphics/**/*.+(png|jpg|jpeg|gif|svg)'],
		dist: ['../craft/web/media/graphics']
	},
	icon : {
		src: ['./public/media/icons/**/*.svg'],
		dist: ['../craft/web/media/icons']
	},
	iconSprite : {
		src: ['./public/media/icons/**/*.svg'],
		dist: ['./public/media/icons/sprite', '../craft/web/media/icons/sprite']
	},
	favicon: {
		src: ['./public/media/favicons/**/*.+(png|ico)'],
		dist: ['./public/media/favicons', '../craft/web/media/favicons']
	},
	lottie: {
		src: ['./public/media/lotties/**/*.json'],
		dist: ['../craft/web/media/lotties']
	}
}

// MESSAGES FOR NOTIFIER
notifier.defaults({
	messages: {
		scss: 'CSS compiled!',
		js: "JS compiled!",
		image: "Images optimized!",
		icon: "Icons created!",
		icon: "Icon sprite created!",
		graphic: "Graphics optimized!",
		fonts: "Fonts optimized!",
		favicon: "Favicon optimized!",
		readme: "Readme optimized!",
		lottie: "Lotties transported"
	},
	prefix: '===>',
	suffix: '<===',
	exclusions: '.map'
})

// SCSS
const scssTask = (done) => {
	gulp.src(filePaths.scss.src, {"allowEmpty": true})
	.pipe(plumber({errorHandler: notifier.error}))
	.pipe(concat('main.min.css'))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(cssnano())
	.pipe(sourcemaps.write('.'))
	.pipe(dest(filePaths.scss.dist[0]))
	.pipe(dest(filePaths.scss.dist[1]))
	.pipe(notifier.success('scss'));
	done();
}
	
	// FONT TASK
	const fontTask = (done) => {
		gulp.src(filePaths.fonts.src)
			.pipe(dest(filePaths.fonts.dist[0]))
			.pipe(notifier.success('fonts'))
		done();
	}

// JS TASK
const jsTask = (done) => {
	gulp.src(filePaths.js.src)
		.pipe(plumber({ errorHandler: notifier.error }))
		.pipe(webpackStream(webpackConfig))
		.pipe(dest(filePaths.js.dist[0]))
		.pipe(dest(filePaths.js.dist[1]))
		.pipe(notifier.success('js'));
	done();
}

// IMAGE TASK
const imageTask = (done) => {
	gulp.src(filePaths.image.src)
		.pipe(cache(imagemin()))
		.pipe(dest(filePaths.image.dist[0]))
		.pipe(notifier.success('image'))
	done();
}

// GRAPHIC TASK
const graphicTask = (done) => {
	gulp.src(filePaths.graphic.src)
		.pipe(cache(imagemin()))
		.pipe(dest(filePaths.graphic.dist[0]))
		.pipe(notifier.success('graphic'))
	done();
}

// ICON TASK
const iconTask = (done) => {
	gulp.src(filePaths.icon.src)
		.pipe(svgmin())
		.pipe(dest(filePaths.icon.dist[0]))
		.pipe(notifier.success('icon'))
	done();
}

// FAVICON TASK
const faviconTask = (done) => {
	gulp.src(filePaths.favicon.src)
		.pipe(favicons({
			appName: 'Gulp with Fractal Setup',
			appShortName: 'LCT',
			appDescription: 'Setup that that offers production ready components in Fractal and Craft',
			developerName: 'Jérôme Haas',
			developerURL: 'jeromehaas.dev',
			background: '#fff',
			path: './public/media/favicons/',
			url: '',
			display: 'standalone',
			orientation: 'portrait',
			scope: '/',
			start_url: '/',
			version: 1.0,
			logging: false,
			html: 'index.html',
			pipeHTML: true,
			replace: true,
		}))
		.pipe(gulp.dest(filePaths.favicon.dist[0]))
		.pipe(notifier.success('favicon'))
		done();
};

// LOTTIE TASK
const lottieTask = (done) => {
	gulp.src(filePaths.lottie.src)
		.pipe(gulpCopy(filePaths.lottie.dist[0], { prefix: 3 }))
		.pipe(notifier.success('lottie'))
		done();
}


// WATCH TASK
const watchTask = () => {
	browserSync.init({
		server: { baseDir: './' },
		open: false,
		port: 3007,
		ui: {
			port: 3008
		},
	});
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch(filePaths.scss.src, scssTask).on("change", browserSync.reload);
	gulp.watch(filePaths.js.src, jsTask).on("change", browserSync.reload);
}

const buildTask = parallel(scssTask, fontTask, jsTask, imageTask, iconTask, graphicTask, faviconTask, lottieTask);
const developTask = series(scssTask, jsTask, watchTask);
const assetTask = series(fontTask, imageTask, iconTask, graphicTask, faviconTask, lottieTask, watchTask);

module.exports = {
	default: developTask,
	build: buildTask,
	assets: assetTask,
}