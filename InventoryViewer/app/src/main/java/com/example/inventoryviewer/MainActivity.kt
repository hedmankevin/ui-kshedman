package com.example.inventoryviewer

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.inventoryviewer.ui.theme.InventoryViewerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            InventoryViewerTheme {
                RockShopUI()
            }
        }
    }
}

@Composable
fun RockShopUI() {
    var showInventory by remember { mutableStateOf(true) }
    var searchQuery by remember { mutableStateOf("") }

    // Full list of items
    val fullInventory = listOf(
        "Amethyst", "Quartz", "Obsidian", "Jade", "Lapis Lazuli", "Tiger's Eye", "Rose Quartz",
        "Citrine", "Agate", "Garnet", "Sodalite", "Fluorite", "Malachite", "Moonstone",
        "Tourmaline", "Peridot", "Topaz", "Carnelian", "Amazonite", "Labradorite",
        "Chrysoprase", "Zircon", "Bloodstone", "Calcite", "Kyanite", "Hematite", "Pyrite",
        "Chalcedony", "Smoky Quartz", "Sunstone", "Aquamarine", "Onyx", "Howlite", "Serpentine",
        "Turquoise", "Spinel", "Aventurine", "Beryl", "Azurite", "Celestite", "Coral", "Dioptase",
        "Iolite", "Jasper", "Lepidolite", "Magnetite", "Opal", "Rhodonite", "Scapolite", "Zoisite"
    )

    // Filtered list based on search query
    val filteredInventory = fullInventory.filter {
        it.contains(searchQuery, ignoreCase = true)
    }

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

            // Search bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("Search rocks...") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp)
            )

            // Toggle inventory visibility
            Button(
                onClick = { showInventory = !showInventory },
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                Text(if (showInventory) "Hide Inventory" else "Show Inventory")
            }

            // Show filtered inventory
            if (showInventory) {
                LazyColumn {
                    items(filteredInventory) { item ->
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