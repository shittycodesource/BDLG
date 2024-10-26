<template>
	<transition name="baseOverlayTransition" v-if="isVisible">
		<div class="homichok">
			<!-- <img :src="require('@/assets/homichok.jpg')"> -->
			<span>{{ activeText }}</span>
		</div>
	</transition>
</template>

<script>
	import random from '../utils/random.js';

	export default {
		name: "vHomichokLoader",
		data() {
			return {
				texts: [
					'ахах хомяк крутится',
					'Загрузка',
					'ахах хомяк крутится',
					'Секунду...',
					'Хомячок',
					'around the world around the world',
					'Думаем',
					'Зачем ты это читаешь?',
					'.... .. .... .. / .... .- .... .-',
					'Полезная информация:',
					'ахах хомяк крутится',
				],
				activeText: ''
			}
		},
		props: {
			isVisible: {
				type: Boolean,
				default: false
			}
		},
		created() {
			const randomNumber = random(0, 10);

			console.log('THE NUMBER', randomNumber)
			this.activeText = this.texts[randomNumber];
		}
		// watch: {
		// 	'isVisible': {
		// 		handler() {
		// 			if (this.isVisible == true) {
		// 				console.log('fsdlkjfldksjfklsdjfklsdjf')
		// 				this.activeText = this.texts[random(1, 5)];
		// 			}
		// 		}
		// 	}
		// }
	}
</script>

<style lang="scss">


	.homichok {
		position: absolute;

		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 100%;
		height: 100vh;

		background: white;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 2.5rem;

		z-index: 10000;

		span {
			font-weight: 800;
			font-size: 2rem;
		}

		img {
			max-width: 15rem;
			width: 100%;

			animation: homichok .5s infinite ease-in-out;

			@keyframes homichok {
				0% {
					transform: rotate(0deg);
				}

				100% {
					transform: rotate(360deg);
				}
			}
		}
	}

</style>