<?php
/**
 * Single posts.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<main id="main" class="site-main page-main">
	<div class="container content-container">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class( 'page-entry' ); ?>>
				<header class="entry-header"><p class="eyebrow"><?php esc_html_e( 'PANZY JOURNAL', 'panzy' ); ?></p><h1 class="entry-title"><?php the_title(); ?></h1></header>
				<?php if ( has_post_thumbnail() ) : ?><div class="post-featured-image"><?php the_post_thumbnail( 'large' ); ?></div><?php endif; ?>
				<div class="entry-content"><?php the_content(); ?></div>
			</article>
			<?php
			the_post_navigation();
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			}
		endwhile;
		?>
	</div>
</main>
<?php get_footer(); ?>
