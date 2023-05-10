<template>
  <div class="chat-thread mt-5 d-flex flex-column" style="overflow-y: auto; position: fixed; bottom: 0; width: 90%;">
    <div class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
      >
        <div
          v-if="message.mr"
          class="from-me"
        >
          <span>{{ message.mr }}</span>
        </div>
        <div
          v-if="message.bot"
          class="from-them"
        >
          <span>{{ message.bot }}</span>
        </div>
        <div
          v-if="message.image"
          class="from-them"
          @click="openCarousel(index)"
        >
          <img :src="message.image[0]" class="message-image" />
          <img v-if="message.image.length > 1" :src="message.image[1]" class="message-image" />
        </div>
      </div>
    </div>
    <div class="input-container">
      <form class="form-container" @submit.prevent="sendMessage">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-icon">
              <div class="dropdown dropup">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-display="static" data-bs-boundary="viewport" aria-expanded="false">
                  <IconZiggyBotAI width="50px" height="50px" />
                </button>
                <ul class="dropdown-menu dropup-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <label class="dropdown-item" for="imageCheckbox">
                      <input type="checkbox" id="imageCheckbox" v-model="imageCheckbox" />
                      { DALL·E } Image Generation
                    </label>
                  </li>
                  <li>
                    <label class="dropdown-item" for="chat4">
                      <input type="checkbox" id="chat4" v-model="chat4" />
                      { ChatGPT 4 } Premium 
                    </label>
                  </li>
                  <li>
                    <label class="dropdown-item" for="chat4">
                      <input type="checkbox" id="chat4" v-model="chat4" />
                      { Monster Image's API } Premium 
                    </label>
                  </li>
                  <!-- <li><a class="dropdown-item" href="#">Settings</a></li> -->
                  <!-- <li><SignOut /></li> -->
                </ul>
              </div>
            </span>
          </div>
          <input v-model="messageInput" type="text" class="form-control" :class="inputBackgroundClass" placeholder="Enter your message" required>
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <ImageCarousel ref="carousel" :images="carouselImages" />
</template>



<script>
import Message from "../components/Message.vue";
import IconZiggyBotAI from "../components/icons/IconZiggyBotAI.vue";
import axios from "axios";
import ImageCarousel from "../components/ImageCarousel.vue";
import Cookies from "js-cookie";


export default {
  name: "ChatWindow",
  components: {
    Message,
    IconZiggyBotAI,
    ImageCarousel,
  },
  data() {
    return {
      messages: [
        {
          bot: "Hello, how may I assist you?",
        },
      ],
      messageInput: "",
      imageCheckbox: false,
      chat4: false,
      chat4Checkbox: false, // Add this line
      carouselImages: [],
    };
  },
  computed: {
    inputBackgroundClass() {
      return this.imageCheckbox ? "yellow-background" : "";
    },
  },

 methods: {
  sendMessage() {
    const jwt = localStorage.getItem('jwt');
    //console.log('JWT:', jwt);

    var mr = {
      mr: this.messageInput,
    };
    this.messages.push(mr);

    if (this.imageCheckbox) {
      axios
        .post(
          "http://localhost:3000/image",
          {
            text: this.messageInput,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((imageResponse) => {
          //console.log("Image response:", imageResponse);

          const imageUrls = imageResponse.data.image.map(
            (image) => image.url
          );
          const imageMessage = {
            bot: "",
            image: imageUrls,
          };
          //console.log("Image message:", imageMessage);
          this.messages.push(imageMessage);
        });
    } else if (this.chat4Checkbox) {
      axios
        .post(
          "http://localhost:3000/chat4",
          {
            text: this.messageInput,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((response) => {
          //console.log(response.data);
          this.messages.push({ bot: response.data });
          //console.log(this.messages);
        });
    } else {
      axios
        .post(
          "http://localhost:3000/chat",
          {
            text: this.messageInput,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((response) => {
          //console.log(response.data);
          this.messages.push({ bot: response.data });
          //console.log(this.messages);
        });
    }

    this.messageInput = "";
    this.imageCheckbox = false;
    this.chat4Checkbox = false; // Add this line
  },

  openCarousel(index) {
    this.carouselImages = this.messages[index].image;
    this.$refs.carousel.openCarousel();
  },
},
};
</script>




<style scoped>

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* Style the from-me message bubble */
/* From-me messages */

.from-them {
  align-self: flex-start;
  text-align: left;
  border-radius: 90px 90px 90px 10px/ 150px;
  background-color: #CCC;
  float: left;
  clear: both;
  max-width: 55%;
  padding-left: 30px;
  padding-right: 10px;
  overflow-wrap: break-word;
  padding-top: 10px;
  padding-bottom: 5px;
}

.from-me {
  align-self: flex-end;
  text-align: right;
  border-radius: 90px 90px 90px 10px/ 120px;
  background-color: #1982FC;
  float: right;
  clear: both;
  padding: 10px;
  max-width: 70%;
}

.msg.right {
  border-radius: 90px 90px 90px 10px/ 120px;
  background-color:#1982FC;
  float: right;
  clear: both;
  padding: 10px;
  max-width: 70%;
}

.msg.left {
  border-radius: 90px 90px 90px 10px/ 150px;
  background-color:#CCC;
  float: left;
  clear: both;
  max-width: 55%;
  padding-left: 30px;
  padding-right: 10px;
  overflow-wrap: break-word;
  padding-top: 10px;
  padding-bottom: 5px;
}

.message-container {
  width: 100%;
  max-height: calc(100vh - 120px); /* adjust as needed */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px; /* adjust as needed */
  flex-grow: 1;
}

.input-group-icon{
  margin-top: auto;
  padding-right: 10px;
  padding-left: 10px;
}

.dropdown {
  position: relative;
}

.dropup {
  z-index: 2000;
}
.input-group-prepend {
    position: relative;
  }

.chat-thread {
  z-index: 0;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  margin: 5px 0;
}

.yellow-background {
  background-color: rgba(255, 255, 0, 0.1);
}
</style>
