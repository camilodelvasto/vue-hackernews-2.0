import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type) {
  return {
    name: `${type}-stories-view`,

    asyncData ({ store }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),
    beforeMount () {
      //const ein = this.$route.params.ein
      //this.$store.dispatch('FETCH_NONPROFIT', { ein })
      console.log('this.$store.state.list.length: ', this.$store.state.lists.top.length)
    },

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
