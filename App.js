import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);

	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert("You didn't select any image.");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer
					PlaceholderImageSource={PlaceholderImage}
					selectedImage={selectedImage}
				/>
			</View>
			<View style={styles.footerContainer}>
				<Button
					label="Choose a photo"
					theme="primary"
					onPress={pickImageAsync}
				/>
				<Button label="Use this photo" />
			</View>
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
});
