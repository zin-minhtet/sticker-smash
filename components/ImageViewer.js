import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ PlaceholderImageSource }) {
	return <Image source={PlaceholderImageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});
