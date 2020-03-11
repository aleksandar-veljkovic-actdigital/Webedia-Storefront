<template>
	<div class="product-item">
		<div class="product-item--image">
			<img :src="product.images[0].cachedPath" alt="">
		</div>
      	<h2 class="product-item--title">{{product.name}}</h2>
      	<div 
      		class="product-item--price"
      	>
      		{{ getPrice(product.variants) }}$
      	</div>
        <button class="c-button" @click="cartAdd(product)">Cart Add</button>
	</div>
</template>

<script>
export default {
	props: ['product'],
	methods: {
	    cartAdd (product) {
	      this.$store.dispatch('cart/addItem', product);
	    },
	    getPrice(productPrice) {
			return Object.values(productPrice)[0].price.current;
	    }
	}
}
</script>

<style scoped lang="scss">
	.product-item{
		background: $color-alabaster;
		text-align: center;
		padding: 0 12px 20px 12px;
		margin-bottom: 24px;
		@include breakpoint(desktop){
			width: calc(100% / 4 - 42px);
			margin-right: 24px;
			&:nth-child(4n){
				margin-right: 0;
			}
		}
	}
	.product-item--image{
		margin-bottom: 24px;
		img{
			display: block;
		}
	}
	.product-item--title{
		text-transform: uppercase;
		font-family: Josefin Sans;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.product-item--price{
		font-family: Josefin Sans;
		font-size: 14px;
		margin-bottom: 10px;
	}
</style>