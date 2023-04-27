<template>
  <div class="chat-thread mt-5 d-flex flex-column" style="overflow-y: auto; position: fixed; bottom: 0; width: 90%;">
    <div class="message-container" style="flex-grow: 1; margin-top: auto;">
      <div v-for="(message, index) in messages" :key="index">
        <Message v-if="index % 2 === 0" class="from-me msg right" :text="message.mr"/>
        <Message v-else class="from-them msg left" :text="message.bot" :image="message.image" v-on:openImage="openImage"/>
        <Message v-else class="from-them msg left" :text="message.bot" v-html="message.Ziggy"/>
      </div>
    </div>
    <div class="input-container">
      <form class="form-container" @submit.prevent="sendMessage">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-icon">
              <div class="dropdown dropup">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-display="static" data-bs-popper="none" aria-expanded="false">
                  <IconZiggyBotAI width="50px" height="50px" />
                </button>
                <ul class="dropdown-menu dropup-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <label class="dropdown-item" for="imageCheckbox">
                      <input type="checkbox" id="imageCheckbox" v-model="imageCheckbox" />
                      { DALL·E } Image Generation
                    </label>
                  </li>
                  <!-- <li><a class="dropdown-item" href="#">Settings</a></li> -->
                  <!-- <li><SignOut /></li> -->
                </ul>
              </div>
            </span>
          </div>
          <input v-model="messageInput" type="text" class="form-control" placeholder="Enter your message" required>
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import IconZiggyBotAI from "../components/icons/IconZiggyBotAI.vue";
import Message from "../components/Message.vue";
import axios from "axios";

export default {
  name: "ChatWindow",
  components: {
    Message,
  },
  data() {
    return {
      messages: [],
      messageInput: "",
      imageCheckbox: false,
    };
  },
  methods: {
    sendMessage() {
      var mr = {
        mr: this.messageInput,
      };
      this.messages.push(mr);

      if (this.imageCheckbox) {
        axios
          .post("http://localhost:3000/image", {
            text: this.messageInput,
          })
          .then((imageResponse) => {
            console.log(imageResponse.data.image);
            const imageMessage = {
              bot: '',
              image: imageResponse.data.image,
            };
            // console.log({Image: imageResponse.data.image});
            this.messages.push({Image: imageResponse.data.image});
            console.log(this.messages)
          });
      } else {
        axios
          .post("http://localhost:3000/chat", {
            text: this.messageInput,
          })
          .then((response) => {
            console.log(response.data)
            this.messages.push(response.data);
          });
      }

      this.messageInput = "";
    },
    openImage(imageUrl) {
      window.open(imageUrl, "_blank");
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
}
.from-me {
  align-self: self-end;
  text-align: right;
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
  z-index: 1000;
}

.input-group-prepend {
    position: relative;
  }

/* .dropup-menu {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  transform: translateY(0);
} */

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  margin: 5px 0;
}
</style>
