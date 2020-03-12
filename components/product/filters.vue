<template>
	<div class="filters" :class="{opened: filterOpened}">
		<div class="filters--top">
			<div>
				<p>Filtre Active</p>
				<div 
					class="filters--close"
					@click="closeFilters"
				>X</div>
			</div>
			<div>
				<p>Nettoyants et demaquillants</p>
				<div class="filters--remove">X</div>
			</div>
			<button class="filters--top--erase">Effacer</button>
		</div>

		<div class="filter--block">
			<h3 class="filter--block--title">Filtrer par categorie</h3>
			<ul class="filter--block--list">
				<li class="filter--block--item">
					<label class="filter--block--checkbox">
						<input type="checkbox" class="filter--block--input">
	  					<span class="checkmark"></span>						
					</label>
					Nettoyants & Démaquillants
					<div class="filter--block--number">12</div>
				</li>
				<li class="filter--block--item">
					<label class="filter--block--checkbox">
						<input type="checkbox" class="filter--block--input">
	  					<span class="checkmark"></span>						
					</label>
					Soins de Jour
					<div class="filter--block--number">12</div>
				</li>
				<li class="filter--block--item">
					<label class="filter--block--checkbox">
						<input type="checkbox" class="filter--block--input">
	  					<span class="checkmark"></span>						
					</label>
					Soins de Nuit
					<div class="filter--block--number">12</div>
				</li>
				<li class="filter--block--item">
					<label class="filter--block--checkbox">
						<input type="checkbox" class="filter--block--input">
	  					<span class="checkmark"></span>						
					</label>
					Sérums
					<div class="filter--block--number">12</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		closeFilters(){
        	this.$store.dispatch('filters/triggerFilters');
		}
	},
	computed: {
		filterOpened(){
		  return this.$store.state.filters.filterOpened;
		}
	}
}
</script>

<style scoped lang="scss">
	.filters{
	    position: fixed;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: $color-white;
	    padding: 14px;
	    max-width: 300px;
	    transform: translateX(-400px);
		transition: transform .2s linear;
		&.opened{
	    	transform: translateX(0);
			transition: transform .2s linear;
		}
		@include breakpoint(desktop){
			position: relative;
			width: 328px;
			padding-left: 24px;
			max-width: 100%;
	    	transform: translateX(0);
		}
	}
	.filters--top{
		overflow: hidden;
		padding-bottom: 50px;
		border-bottom: 1px solid $color-silver-chalice;
		margin-bottom: 40px;
		&>div{
			display: flex;
			justify-content: space-between;
			&:first-child{
				margin-bottom: 20px;
				p{
					text-transform: uppercase;
					font-size: 12px;
				}
			}
			&:nth-child(2){
				p{
					font-family: $ff-times;
					font-size: 14px;
					color: $color-dove-gray;
				}
			}
		}
		@include breakpoint(desktop){
			display: none;
		}
	}
	.filters--top--erase{
		text-transform: uppercase;
		font-size: 12px;
		border: 1px solid $color-dove-gray;
		background: transparent;
		float: right;
		margin-top: 20px;
	}
	.filter--block--title{
		text-transform: uppercase;
		font-size: 12px;
		margin-bottom: 30px;
    	letter-spacing: 1px;
		@include breakpoint(desktop){
			font-size: 14px;
		}
	}
	.filter--block--item{
		font-family: $ff-times;
		font-size: 14px;
		color: $color-dove-gray;
		margin-bottom: 19px;
		display: flex;
		position: relative;
	}
	.filter--block--checkbox{	
		position: relative;
		padding-left: 25px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.filter--block--input{
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
		&:checked ~ .checkmark:after {
  			display: block;
  		}
	}
	.checkmark {
	    position: absolute;
	    top: 0;
	    left: 0;
		border: 1px solid $color-dove-gray;
		width: 15px;
		height: 15px;
		&:after{		
		  content: "";
		  position: absolute;	
		  left: 2px;
		  top: 2px;
		  right: 2px;
		  bottom: 2px;
		  background: $color-dove-gray;
		  display: none;
		}
	}
	.filter--block--number{
		font-family: $ff-times;
		font-size: 14px;
		color: $color-dove-gray;	
		margin-left: auto;	
	}
</style>