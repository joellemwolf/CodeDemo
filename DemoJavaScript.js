//Create tabs for “Shipping” and “Details” that display the shipping cost and product details, respectively.

var eventBus = new Vue()

Vue.component('cat', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
     <div class="cat">
  
        <div class="cat-info">
            <h1>{{ cat }}</h1>
            <p v-if="inStock">This Purrrfect Kitty For You! Adopt Now!</p>
            <p v-else>Sorry, This Cat has already found a home</p>
  
            <info-tabs :howTo="howTo" :details="details"></info-tabs>
  
            <div class="cat-names"
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateCat(index)"
                 >
            </div> 
  
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Claim This Kitty!
            </button>
  
         </div> 
        

         <div class="cat-image">
            <img :src="image" />
         </div>
        
         <div class="cat-image">
            <cat-tabs :reviews="reviews"></cat-tabs>
         </div>
      
      </div>
     `,
    data() {
      return {
          cat: 'THIS MONTH\'S CATS',
          brand: 'Helpless Cat',
          details: ['Comes with a squeaky mouse toy', 'Also comes with Cat Nip'],
          selectedVariant: 0,
          variants: [
            {
              variantId: 2201,
              variantColor: '#ffbfee',
              variantImage: 'https://www.dropbox.com/s/4siuvusny3qtx4o/miron-cristina-HW_6USwudbo-unsplash%281%29.jpg?raw=1',
              variantQuantity: 1     
            },
                        {
              variantId: 2301,
              variantColor: '#ffbfee',
              variantImage: 'https://www.dropbox.com/s/lwyqzepu0oux37s/hang-niu-Tn8DLxwuDMA-unsplash.jpg?raw=1',
              variantQuantity: 1     
            },
                        {
              variantId: 2401,
              variantColor: '#ffbfee',
              variantImage: 'https://www.dropbox.com/s/rgy9v6qc1nifxeq/long-ma-hxEAE88Onv0-unsplash.jpg?raw=1',
              variantQuantity: 1     
            },
                        {
              variantId: 2501,
              variantColor: '#ffbfee',
              variantImage: 'https://www.dropbox.com/s/asaapmki8jbjrqz/timo-volz-ZlFKIG6dApg-unsplash.jpg?raw=1',
              variantQuantity: 1     
            },
                        {
              variantId: 2601,
              variantColor: '#ffbfee',
              variantImage: 'https://www.dropbox.com/s/jxg3iu2qx6gggki/remi-remino-E9kVmtiqqGE-unsplash.jpg?raw=1',
              variantQuantity: 1     
            },
            {
              variantId: 2701,
              variantColor: '#ff6266',
              variantImage: 'https://www.dropbox.com/s/4oz0z4pukuhl04o/mikhail-vasilyev-IFxjDdqK_0U-unsplash.jpg?raw=1',
              variantQuantity: 0     
            }
          ],
          reviews: []
      }
    },
      methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateCat(index) {  
            this.selectedVariant = index
        }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.cat  
          },
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          howTo() {
            if (this.variants[this.selectedVariant].variantQuantity==1) {
              return "Click Add To Cart! Limted Time Only"
            }
              return "Cat is Unavailable. Choose Another!"
          }
      },
      mounted() {
        eventBus.$on('review-submitted', catReview => {
          this.reviews.push(catReview)
        })
      }
  })


  Vue.component('cat-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p>
        <label for="name">What's Your Name?</label>
        <input id="name" v-model="name">
      </p>

      <p>
        <label for="review">Tell Us What You Think!</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating</label>
        <select id="rating" v-model.number="rating">
          <option> * * * * * </option>
          <option> * * * * </option>
          <option> * * * </option>
          <option> * * </option>
          <option> * </option>
        </select>
      </p>

      <p>
        <input type="submit" value="Let The World Know!">  
      </p>    
  
    </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        this.errors = []
        if (this.name && this.review && this.rating) {
          let catReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
          }
          eventBus.$emit('review-submitted', catReview)
          this.name = null
          this.review = null
          this.rating = null
        }
        else {
          if(!this.name) this.errors.push("Name required.")
          if(!this.review) this.errors.push("Review required.")
          if(!this.rating) this.errors.push("Rating required.")
        }
      }
    }
  })

  Vue.component('cat-tabs', {
    props: {
      reviews: {
        type: Array,
        required: false
      }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet. Come back Later When The Lazy Programmer Finally Codes Me... </p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                  <p>{{ review.name }}</p>
                  <p>Rating:{{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Tell Us What You Think'">
          <cat-review></cat-review>
        </div>
    
      </div>
    `,
    data() {
      return {
        tabs: ['Reviews', 'Tell Us What You Think'],
        selectedTab: 'Reviews'
      }
    }
  })

Vue.component('info-tabs', {
    props: {
      howTo: {
        required: true
      },
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'How To Adopt'">
          <p>{{ howTo }}</p>
        </div>

        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
    
      </div>
    `,
    data() {
      return {
        tabs: ['How To Adopt', 'Details'],
        selectedTab: 'How To Adopt'
      }
    }
  })



  
  var app = new Vue({
      el: '#app',
      data: {
        premium: true,
        cart: []
      },
      methods: {
        updateCart(id) {
          this.cart.push(id)
        }
      }
  })