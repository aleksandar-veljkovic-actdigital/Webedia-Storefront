<template>
	<div class="filters">
		<div class="filters--top">
			<div>
				<p>Filtre Active</p>
				<div class="filters--close">X</div>
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
					<input type="text" class="filter--block--input">
					Nettoyants & Démaquillants
					<div class="filter--block--number">12</div>
				</li>
				<li class="filter--block--item">
					<input type="text" class="filter--block--input">
					Soins de Jour
					<div class="filter--block--number">12</div>
				</li>
				<li class="filter--block--item">
					<input type="text" class="filter--block--input">
					Soins de Nuit
					<div class="filter--block--number">12</div>
				</li>
				<li class="filter--block--item">
					<input type="text" class="filter--block--input">
					Sérums
					<div class="filter--block--number">12</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
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
		@include breakpoint(desktop){
			position: relative;
			width: 328px;
			padding-left: 24px;
			max-width: 100%;
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
	}
	.filter--block--input{
		border: 1px solid $color-dove-gray;
		width: 15px;
		height: 15px;
		margin-right: 10px;
	}
	.filter--block--number{
		font-family: $ff-times;
		font-size: 14px;
		color: $color-dove-gray;	
		margin-left: auto;	
	}
</style>