<template>
	<div class="c--filter">
		<DebugData :variable="{options, aggregations}"/>
		<div 
		v-for="option in options"
		:key='option.value'
		class="attribute-option">
			<label>
				<input 
				type="checkbox"
				@change="checkboxChanged(option.value, $event.srcElement.checked)">
				{{option.label}}
			</label>
			<span>{{option.doc_count}}</span>
		</div>
	</div>
</template>

<script>
import DebugData from '@components/_mix/debug-data.vue'

export default {

	components: {
		DebugData,
	},

	props: [
		'code',
		'aggregations'
	],

	data () { return {
		selectedOptions: [],
	} },

	computed: {

		options () {
			const optionsFromAttributes =  JSON.parse(JSON.stringify( this.$store.state.attribute.all )).find(attribut => attribut.attribute_code === this.code)?.options || [];
			const optionsWithProducts = optionsFromAttributes.filter(option => {
				const bucket =  this.aggregations.buckets.find(bucketCandidate => bucketCandidate.key === option.value)
				if (bucket?.doc_count) {
					option.doc_count = bucket.doc_count;
					option.selected = false;
					return true
				}
				else return false;
			})
			return optionsWithProducts;
		},
		
	},

	methods: {

		checkboxChanged (optionId, selected) {
			if (selected) {
				this.selectedOptions.push(optionId)
			} else {
				this.selectedOptions = this.selectedOptions.filter(removeCandidate => removeCandidate !== optionId)
			}
			this.$emit('changed', this.selectedOptions)
		}

	}

}
</script>
