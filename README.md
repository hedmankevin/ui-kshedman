# ui-kshedman


# andriod chat

# ChatGPT Conversation – Rock Shop Inventory UI in Android Studio

**Project Goal**: Create a simple UI in Android Studio for a rock shop that can toggle inventory display and search/filter items. No database required.

---

## ✅ Basic Working UI (Initial Version)

```kotlin
@Composable
fun RockShopUI() {
    var showInventory by remember { mutableStateOf(true) }

    val inventory = listOf("Amethyst", "Quartz", "Obsidian", "Jade", "Lapis Lazuli")

    Scaffold { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Text(
                text = "Rock Shop Inventory",
                fontSize = 24.sp,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            Button(
                onClick = { showInventory = !showInventory },
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                Text(if (showInventory) "Hide Inventory" else "Show Inventory")
            }

            if (showInventory) {
                LazyColumn {
                    items(inventory) { item ->
                        Text(
                            text = item,
                            fontSize = 18.sp,
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    }
                }
            }
        }
    }
}
