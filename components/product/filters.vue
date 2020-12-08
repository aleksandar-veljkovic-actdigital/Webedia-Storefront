<template>
	<div class="c--filter">
		<DebugData :variable="{options, aggregations}"/>

		<div 
		v-for="option in options"
		:key='option.value'
		class="attribute-option">
			<label>
				<input 
				type="checkbox">

				{{option.label}}
			</label>
			<span>{{option.doc_count}}</span>

		</div>


	</div>
</template>

<script>
import DebugData from '~/components/debug-data.vue'

export default {
	components: {
		DebugData,
	},
	props: [
		'code',
		'aggregations'
	],
	computed: {
		options () {
			const optionsFromAttributes =  this.$store.state.attribute.all?.find(attribut => attribut.attribute_code === this.code)?.options || []
			const options = optionsFromAttributes.filter(option => {
				const bucket =  this.aggregations.buckets.find(bucketCandidate => bucketCandidate.key === option.value)
				if (bucket?.doc_count) {
					option.doc_count = bucket.doc_count;
					return true
				}
				else return false;
			})
			return options;
		}
	}

}
</script>
