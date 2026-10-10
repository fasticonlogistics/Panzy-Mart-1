<?php
/**
 * Fallback archive and search results.
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
		<header class="entry-header">
			<p class="eyebrow"><?php esc_html_e( 'PANZY JOURNAL', 'panzy' ); ?></p>
			<h1 class="entry-title"><?php echo esc_html( is_search() ? sprintf( __( 'Search results for “%s”', 'panzy' ), get_search_query() ) : get_the_archive_title() ); ?></h1>
		</header>
		<?php if ( have_posts() ) : ?>
			<div class="post-list">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class( 'post-card' ); ?>>
						<?php if ( has_post_thumbnail() ) : ?><a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'medium_large', array( 'loading' => 'lazy' ) ); ?></a><?php endif; ?>
						<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<div><?php the_excerpt(); ?></div>
					</article>
					<?php
				endwhile;
				?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'No results were found. Please try another search.', 'panzy' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php get_footer(); ?>
