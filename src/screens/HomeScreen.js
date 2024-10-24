import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Homepage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Image */}
      <Image
        source={{
          uri: "https://example.com/construction-banner.jpg",
        }}
        style={styles.headerImage}
      />

      {/* Statistics Section */}
      <View style={styles.statsSection}>
        <Card style={[styles.statCard, styles.blueCard]}>
          <Card.Content>
            <Title>Total Projects</Title>
            <Paragraph>150</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.greenCard]}>
          <Card.Content>
            <Title>Ongoing Projects</Title>
            <Paragraph>45</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.yellowCard]}>
          <Card.Content>
            <Title>Completed Projects</Title>
            <Paragraph>105</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.purpleCard]}>
          <Card.Content>
            <Title>Suppliers</Title>
            <Paragraph>30</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.orangeCard]}>
          <Card.Content>
            <Title>Customers</Title>
            <Paragraph>500</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Construction-related Images */}
      <View style={styles.imagesSection}>
        <Image
          source={{
            uri: "https://example.com/construction1.jpg",
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://example.com/construction2.jpg",
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://example.com/construction3.jpg",
          }}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F3EF",
  },
  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 10,
  },
  blueCard: {
    backgroundColor: "#007bff",
  },
  greenCard: {
    backgroundColor: "#28a745",
  },
  yellowCard: {
    backgroundColor: "#ffc107",
  },
  purpleCard: {
    backgroundColor: "#6f42c1",
  },
  orangeCard: {
    backgroundColor: "#fd7e14",
  },
  imagesSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: "48%",
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
  },
});

export default Homepage;
