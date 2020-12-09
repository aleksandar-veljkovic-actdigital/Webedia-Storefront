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
import DebugData from '~/components/debug-data.vue'

export default {
	components: {
		DebugData,
	},
	props: [
		'code',
		'aggregations'
	],
	data () { return {
		options: (() => {
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
		})(),
	} },
	methods: {
		emitSelectedChexboxes () {
			const selectedOptions = this.options.filter(optionCandidate => optionCandidate.selected === true)
			const selectedOptionIds = Object.values(selectedOptions.map(option => option.value))
			this.$emit('changed', selectedOptionIds)
		},
		checkboxChanged (optionId, selected) {
			const selectedOption = this.options.find(optionCandidate => optionCandidate.value === optionId)
			selectedOption.selected = selected;
			this.emitSelectedChexboxes();
		}
	}

}
</script>
