import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pickedEmoji, setPickedEmoji] = useState(null);

	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert("You didn't select any image.");
		}
	};

	const onReset = () => {
		setShowAppOptions(false);
		setSelectedImage(null);
	};

	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onSaveImageAsync = () => {
		// TODO
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer
					PlaceholderImageSource={PlaceholderImage}
					selectedImage={selectedImage}
				/>
				{pickedEmoji && (
					<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
				)}
			</View>
			{showAppOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon="refresh" label="Reset" onPress={onReset} />
						<CircleButton onPress={onAddSticker} />
						<IconButton
							icon="save-alt"
							label="Save"
							onPress={onSaveImageAsync}
						/>
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button
						label="Choose a photo"
						theme="primary"
						onPress={pickImageAsync}
					/>
					<Button
						label="Use this photo"
						onPress={() => setShowAppOptions(true)}
					/>
				</View>
			)}
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
		justifyContent: "center",
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: "center",
	},
	optionsContainer: {
		position: "absolute",
		bottom: 80,
	},
	optionsRow: {
		alignItems: "center",
		flexDirection: "row",
	},
});
